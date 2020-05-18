import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AddressForm from "./AddressForm";

function AddressFormLogic(props) {
  // change of states in progress

  const [statusMessageForm, setStatusMessageForm] = useState("enregistrée");
  const [errorForm, setErrorForm] = useState(false);
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [isFetched, setIsFetched] = useState(false);
  const [form, setForm] = useState({
    isSuccess: false,
    isFailed: false,
    error: false,
    statusMessageForm: "enregistrée",
    numberError: 0,
  });
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [errorZipCode, setErrorZipCode] = useState(false);
  const [city, setCity] = useState({
    value: "",
    error: false,
  });
  const [country, setCountry] = useState("");
  const [errorCountry, setErrorCountry] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [errorGrasp, setErrorGrasp] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [grasp, setGrasp] = useState("");
  const [method, setMethod] = useState("POST");
  const [idParams] = useState(useParams().id);
  const regexp = new RegExp(/^[\w\d\séùàüäîçïèêôö]*$/);
  const regexpCountryCity = new RegExp(/^[a-zA-Z\s-éùàüäîçïèêôö]*$/);
  let isCancelled = useRef(null);

  useEffect(() => {
    isCancelled.current = false;
    // initialize the number of error form
    setNumberErrorForm(0);

    if ((!form.error || !errorForm) && isSubmit) {
      const body = JSON.stringify({
        isActive,
        id_user: owner,
        title,
        address,
        zipcode: zipCode,
        city: city.value,
        country,
      });

      const url =
        method === "POST"
          ? `http://localhost:5000/louons/api/v1/address`
          : `http://localhost:5000/louons/api/v1/address/${idParams}`;
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body,
      })
        .then((res) => res.json())
        .then((result) => {
          setIsSubmit(false);
          if (!result.error) {
            setForm((prevState) => ({ ...prevState, isSuccess: true }));

            setTimeout(() => {
              !isCancelled.current &&
                setForm((prevState) => ({ ...prevState, isSuccess: false }));
            }, 800);

            if (method === "POST") {
              setTitle("");
              setAddress("");
              setZipCode("");
              setCity({ value: "" });
              setCountry("");
              setGrasp("");
            }
            if (props.setAddresses) {
              props.setAddresses((prevState) => ({
                ...prevState,
                isFetched: false,
              }));
            }
          } else {
            setForm((prevState) => ({ ...prevState, isFailed: true }));
            setTimeout(() => {
              !isCancelled.current &&
                setForm((prevState) => ({ ...prevState, isFailed: false }));
            }, 800);
          }
        });
    }
    // get the data depending if the isFetched state is settled to false and if there are an idParams

    if (idParams && !isFetched && idParams !== "add") {
      setMethod("PUT");
      setStatusMessageForm("modifiée");
      fetch(`http://localhost:5000/louons/api/v1/address/detail/${idParams}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFetched(true);
            setErrorGrasp(false);
            setGrasp(
              `${result.data.id_user.firstName} ${result.data.id_user.lastName}`
            );
            setAddress(result.data.address);
            setTitle(result.data.title);
            setZipCode(result.data.zipcode);
            setCity({ value: result.data.city });
            setCountry(result.data.country);
            setIsActive(result.data.isActive);
            setOwner(result.data.id_user._id);
          } else if (result.error && props.history) {
            return props.history.push("/admin/addresses");
          }
        });
    }

    if (errorGrasp) {
      setNumberErrorForm((prev) => prev + 1);
    }

    if (
      !regexp.test(title) ||
      title === "" ||
      title.length < 5 ||
      title.length > 30
    ) {
      setErrorTitle(true);
      setNumberErrorForm((prevNumber) => prevNumber + 1);
    } else {
      setErrorTitle(false);
    }

    if (
      !regexp.test(address) ||
      address === "" ||
      address.length < 10 ||
      address.length > 80
    ) {
      setErrorAddress(true);
      setNumberErrorForm((prevNumber) => prevNumber + 1);
    } else {
      setErrorAddress(false);
    }

    if (
      !regexpCountryCity.test(city.value) ||
      city.value === "" ||
      city.value.length < 3 ||
      city.value.length > 50
    ) {
      if (!city.error) {
        setCity((prevState) => ({ ...prevState, error: true }));
      }
      setNumberErrorForm((prevNumber) => prevNumber + 1);
    } else {
      if (city.error) {
        setCity((prevState) => ({ ...prevState, error: false }));
      }
    }

    if (
      !regexpCountryCity.test(country) ||
      country === "" ||
      country.length < 3 ||
      country.length > 20
    ) {
      setErrorCountry(true);
      setNumberErrorForm((prevNumber) => prevNumber + 1);
    } else {
      setErrorCountry(false);
    }

    if (
      zipCode === 0 ||
      zipCode === "" ||
      typeof zipCode === String ||
      zipCode > 99999 ||
      zipCode < 0 ||
      zipCode.length < 4 ||
      zipCode.length > 5
    ) {
      setErrorZipCode(true);
      setNumberErrorForm((prevNumber) => prevNumber + 1);
    } else {
      setErrorZipCode(false);
    }

    if (numberErrorForm > 0) {
      if (!form.error) {
        setForm((prevState) => ({ ...prevState, error: true }));
      }
      setErrorForm(true);
    } else {
      if (form.error) {
        setForm((prevState) => ({ ...prevState, error: false }));
      }
      setErrorForm(false);
    }

    return () => {
      isCancelled.current = true;
    };
  }, [
    idParams,
    numberErrorForm,
    regexp,
    regexpCountryCity,
    title,
    address,
    city,
    country,
    zipCode,
    errorGrasp,
    isFetched,
    form,
    props.history,
    owner,
    errorForm,
    isActive,
    isSubmit,
    method,
    props,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  return (
    <AddressForm
      history={props.history}
      form={form}
      titlepage={props.title}
      errorGrasp={errorGrasp}
      isActive={isActive}
      isShow={isShow}
      setIsShow={setIsShow}
      setIsActive={setIsActive}
      handleSubmit={handleSubmit}
      isSubmit={isSubmit}
      idParams={idParams}
      statusMessageForm={statusMessageForm}
      grasp={grasp}
      setGrasp={setGrasp}
      setOwner={setOwner}
      setErrorGrasp={setErrorGrasp}
      title={title}
      setTitle={setTitle}
      errorTitle={errorTitle}
      address={address}
      setAddress={setAddress}
      errorAddress={errorAddress}
      zipCode={zipCode}
      setZipCode={setZipCode}
      errorZipCode={errorZipCode}
      city={city}
      setCity={setCity}
      country={country}
      setCountry={setCountry}
      errorCountry={errorCountry}
    />
  );
}

export default AddressFormLogic;
