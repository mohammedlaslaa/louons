const {
  Rental,
  schemaValidationRental,
  schemaPutValidationRental,
} = require("../models/rentalModel");
const moment = require("moment");
const { User } = require("../models/userModel");
const { Payment } = require("../models/paymentModel");
const { Carrier } = require("../models/carrierModel");
const { Article } = require("../models/articleModel");

exports.getAllRentals = async function (req, res) {
  try {
    // Only an admin can perform this action.

    const allRental = await Rental.find()
      .populate("id_article", "title -_id")
      .populate("id_user", "lastName firstName -_id");

    // If the request fail, return a 400 response status code with a message.

    if (!allRental)
      return res.status(400).send({
        error: true,
        message: "Bad request",
      });

    // If the request succeeded, return a 200 response status code with all users.

    return res
      .status(200)
      .send({ adminLevel: res.locals.admin.adminLevel, data: allRental });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllMyRental = async function (req, res) {
  try {
    // This action can be performed by an admin or an user.

    // Check if the request comes by an admin. If that is the case, return all rental.

    if (res.locals.owner.adminLevel) {
      
      return res.status(200).send({
        error: false,
        message: "You are an admin, please check the right route",
      });
    }

    // Check that there are rentals with the res.locals.owner.id provided by the token.

    const myRental = await Rental.find({ id_user: res.locals.owner.id }).populate("id_payment", "title").populate("id_carrier", "title").populate("id_article", "title");

    // If there are not rentals found, send a 400 response status code with a message.

    if (!myRental || myRental.length == 0)
      return res.status(200).send({
        error: true,
        message: "There is not rentals found",
      });

    // If all the checks is passing, return the rentals to the client, with a 200 response status code.

    return res.send({ data: myRental });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAvailableDate = async function (req, res) {
  try {
    let result = [];
    let i = 0;
    let j = 0;
    let number = parseInt(req.params.number);
    let findRental;
    let dateStart;
    let dateEnd;

    if (req.params.number > 0) {
      while (result.length < 5) {
        let obj = {};
        j++;
        dateStart = new Date(Date.now() + 3600 * 1000 * 24 * j);
        dateEnd = new Date(Date.now() + 3600 * 1000 * 24 * (number + j));

        // Check if the same Rental exist at this start date.

        findRental = await Rental.find({
          id_article: req.params.id,
          start_date: { $lte: moment(dateStart).format("YYYY-MM-DD") },
          end_date: { $gte: moment(dateStart).format("YYYY-MM-DD") },
          isActive: true,
        });

        // If the same rental exist at this start date, send a 400 response status code with a message.

        if (findRental.length === 0) {
          findRental = await Rental.find({
            id_article: req.params.id,
            start_date: {
              $gte: moment(dateStart).format("YYYY-MM-DD"),
              $lte: moment(dateEnd).format("YYYY-MM-DD"),
            },
            isActive: true,
          });

          if (findRental.length === 0) {
            obj["dateStart"] = dateStart;
            obj["dateEnd"] = dateEnd;
            result[i] = obj;
            i++;
          }
        }
      }
      return res.status(200).send({ error: false, data: result });
    }else{
      return res.status(400).send({error: true, message : 'The number params must be a positive integer'})
    }
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getRentalById = async function (req, res) {
  try {
    // Do the request rental depending if the client is an admin or not.

    const rental = res.locals.owner.adminLevel
      ? await Rental.findOne({
          _id: req.params.id,
        })
          .populate("id_article", "title id_user price")
          .populate("id_user", "clientId lastName firstName")
          .populate("id_payment", "title")
          .populate("id_carrier", "title")
      : await Rental.findOne({
          _id: req.params.id,
          id_user: res.locals.owner.id,
        })
          .populate("id_article", "title")
          .populate("id_user", "clientId lastName firstName")
          .populate("id_payment", "title")
          .populate("id_carrier", "title");

    // If there are not rental found, send a 400 response status code with a message.

    if (!rental)
      return res
        .status(200)
        .send({ error: true, message: "Empty list, not rental found" });

    // If all the checks is passing, return the rental to the client, with a 200 response status code.

    return res.send({ error: false, data: rental });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postRental = async function (req, res) {
  try {
    // Validation post inscription rental.

    const { error } = schemaValidationRental.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // Check if the user exist, to ensure that the req.body.id_user is right.

    if (req.body.id_user && res.locals.owner.adminLevel) {
      const ifUserExist = await User.findOne({ _id: req.body.id_user });
      if (!ifUserExist)
        return res.status(400).send({
          error: true,
          message: "Invalid user ID",
        });
    }

    // Check that the start date is less than the end date, if not send a 400 response status code with a message.

    if (
      new Date(req.body.start_date).getTime() >
      new Date(req.body.end_date).getTime()
    )
      return res.status(400).send({
        error: true,
        message:
          "Invalid request, the start date must be less than the end date",
      });

    // Check if the same Rental exist at this start date.

    let ifSameRentalExist = await Rental.find({
      id_article: req.body.id_article,
      start_date: { $lte: req.body.start_date },
      end_date: { $gte: req.body.start_date },
      isActive: true,
    });

    // If the same rental exist at this start date, send a 400 response status code with a message.

    if (ifSameRentalExist.length > 0)
      return res.status(400).send({
        error: true,
        message: "This rental is already reserved on this start date",
      });

    // Check id the same Rental exist at this date.

    ifSameRentalExist = await Rental.find({
      id_article: req.body.id_article,
      start_date: { $gte: req.body.start_date, $lte: req.body.end_date },
      isActive: true,
    });

    // If the same rental exist at this end date, send a 400 response status code with a message.

    if (ifSameRentalExist.length > 0)
      return res.status(400).send({
        error: true,
        message: "This rental is already reserved on this end date",
      });

    // Check that the id payment match to a valid payment, otherwise, send a 400 response status code with a message.

    const isPayment = await Payment.findOne({ _id: req.body.id_payment });
    if (!isPayment)
      return res.status(400).send({
        error: true,
        message: "Invalid Payment",
      });

    // Check that the id carrier match to a valid carrier, otherwise, send a 400 response status code with a message.

    const isCarrier = await Carrier.findOne({ _id: req.body.id_carrier });
    if (!isCarrier)
      return res.status(400).send({
        error: true,
        message: "Invalid Carrier",
      });

    // Check that the id article match to a valid article, otherwise, send a 400 response status code with a message.

    const isArticle = await Article.findOne({ _id: req.body.id_article });
    if (!isArticle)
      return res.status(400).send({
        error: true,
        message: "Invalid Article",
      });

    // The ownerId will sent to the id_user field depending if the client is an admin or not.

    let ownerId = res.locals.owner.adminLevel
      ? req.body.id_user
      : res.locals.owner.id;

    if (ownerId === isArticle.id_user)
      return res.status(400).send({
        error: true,
        message: "A user cannot rent their own item",
      });

    // Get the max value of rentalId and increment it to the next user registered.

    const maxId = await Rental.find()
      .sort({ rentalId: -1 })
      .limit(1)
      .select("rentalId");

    let valueId;

    // If the maxId does not return a value set the valueId to 1 by default.

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].rentalId + 1);

    // Create a new rental document.

    const rental = new Rental({
      rentalId: valueId,
      id_user: ownerId,
      id_payment: req.body.id_payment,
      id_carrier: req.body.id_carrier,
      id_article: req.body.id_article,
      total_price: req.body.total_price,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    });

    // If all the checks is passing, save the rental, then send back a 200 response status code with a successfull message.

    await rental.save();

    return res.status(201).send({
      error: false,
      message: "`The rental has been placed`",
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putRentalById = async function (req, res) {
  try {
    // Validation put inscription rental.

    const { error } = schemaPutValidationRental.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // Check if the user exist, to ensure that the req.body.id_user is right.

    if (req.body.id_user && res.locals.owner.adminLevel) {
      const ifUserExist = await User.findOne({ id: req.body.id_user });
      if (!ifUserExist)
        return res.status(400).send({
          error: true,
          message: "Invalid user ID",
        });
    }

    // Check if the req.body.start_date is completed, otherwise, check if the req.body.end_date is completed.

    if (req.body.start_date) {
      // Check if the req.body.end_date is completed, otherwise, send back a 400 response status code with a message.

      if (req.body.end_date) {
        // Check that the start date is less than the end date, if not send a 400 response status code with a message.

        if (
          new Date(req.body.start_date).getTime() >
          new Date(req.body.end_date).getTime()
        ) {
          return res.status(400).send({
            error: true,
            message:
              "Invalid request, the start date must be less than the end date",
          });
        }
      } else {
        return res.status(400).send({
          error: true,
          message: "You can not modify the date start without the date end",
        });
      }
    } else if (req.body.end_date) {
      // Check if the req.body.start_date is completed, otherwise, send back a 400 response status code with a message.
      if (!req.body.start_date) {
        return res.status(400).send({
          error: true,
          message: "You can not modify the date end without the date start",
        });
      }
    }

    // Check that the id payment match to a valid payment, otherwise, send a 400 response status code with a message.

    if (req.body.id_payment) {
      const isPayment = await Payment.findOne({ _id: req.body.id_payment });
      if (!isPayment)
        return res.status(400).send({
          error: true,
          message: "Invalid Payment",
        });
    }
    // Check that the id carrier match to a valid carrier, otherwise, send a 400 response status code with a message.

    if (req.body.id_carrier) {
      const isCarrier = await Carrier.findOne({ _id: req.body.id_carrier });
      if (!isCarrier)
        return res.status(400).send({
          error: true,
          message: "Invalid Carrier",
        });
    }

    // Check if a Rental exist with the req.params.id provided.

    const ifRentalExist = await Rental.findById(req.params.id);
    if (!ifRentalExist)
      return res.status(400).send({
        error: true,
        message: "Invalid Rental",
      });

    // Check if the same Rental exist at this start date, without the rental itself.

    let ifSameRentalExist = await Rental.find({
      _id: { $not: { $eq: req.params.id } },
      id_article: ifRentalExist.id_article,
      start_date: { $lte: req.body.start_date },
      end_date: { $gte: req.body.start_date },
      isActive: true,
    });

    // If the same rental exist at this start date, send a 400 response status code with a message.

    if (ifSameRentalExist.length > 0)
      return res.status(400).send({
        error: true,
        message: "This rental is already reserved on this start date",
      });

    // Check id the same Rental exist at this end date, without the rental itself.

    ifSameRentalExist = await Rental.find({
      _id: { $not: { $eq: req.params.id } },
      id_article: ifRentalExist.id_article,
      start_date: { $gte: req.body.start_date, $lte: req.body.end_date },
      isActive: true,
    });

    // If the same rental exist at this end date, send a 400 response status code with a message.

    if (ifSameRentalExist.length > 0)
      return res.status(400).send({
        error: true,
        message: "This rental is already reserved on this end date",
      });

    // Check if a Rental exist with the req.params.id provided, depending if the client is an admin or not, and update.

    const rental = res.locals.owner.adminLevel
      ? await Rental.findByIdAndUpdate(req.params.id, {
          $set: req.body,
          date_update: Date.now(),
        })
      : await Rental.findByIdAndUpdate(
          { _id: req.params.id, id_user: res.locals.owner.id },
          {
            $set: req.body,
            date_update: Date.now(),
          }
        );

    // If there are not rental found, send a 400 response status code with a message.

    if (!rental)
      return res
        .status(400)
        .send({ error: true, message: "Empty list, not rental found" });

    // If all the checks is passing, save the rental, then send back a 200 response status code with the rental.

    return res.send({
      error: false,
      message: "The rental has been updated with success",
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteRentalById = async function (req, res) {
  try {
    // Validation put inscription rental.

    const { error } = schemaPutValidationRental.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // Check if a Rental exist with the req.params.id provided, depending if the client is an admin or not, and update.

    const rental = res.locals.owner.adminLevel
      ? await Rental.findOneAndUpdate(req.params.id, {
          date_delete: Date.now(),
          isActive: false,
        })
      : await Rental.findOneAndUpdate(
          { _id: req.params.id, id_user: res.locals.owner.id },
          {
            date_delete: Date.now(),
            isActive: false,
          }
        );

    // If there are not rental found, send a 400 response status code with a message.

    if (!rental)
      return res
        .status(200)
        .send({ error: true, message: "Empty list, not rental found" });

    return res.send(rental);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
