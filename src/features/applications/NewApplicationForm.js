import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { useAddNewApplicationMutation } from "./applicationsApiSlice";

const NewApplicationForm = () => {
  const [addNewApplication, { isLoading, isSuccess, isError, error }] =
    useAddNewApplicationMutation();

  const navigate = useNavigate();

  const [fields, setFields] = useState({
    title: "",
    financeType: {},
    newUsedType: {},
    assetCost: "",
    deposit: "",
    financeAmount: "",
    companyName: "",
    tradingName: "",
    ABN: "",
    fullName: "",
    address: "",
    addressState: {},
    postCode: "",
    licence: "",
    cash: "",
    propertiesValue: "",
    vehiclesAmount: "",
    sharesTermDeposits: "",
    otherMortgage: "",
    creditCard: "",
    otherLiabilities: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSuccess) {
      // setTitle("");
      navigate("/dash/applications");
    }
  }, [isSuccess, navigate]);

  const handleChange = (field, e) => {
    setFields({ ...fields, [field]: typeof e !== "object" ? e : { value: e.value, label: e.label } });
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Field is empty";
    }

    if (!fields["financeType"]) {
      formIsValid = false;
      errors["financeType"] = "Field is empty";
    }

    if (!fields["newUsedType"]) {
      formIsValid = false;
      errors["newUsedType"] = "Field is empty";
    }
    
    if (!fields["assetCost"]) {
      formIsValid = false;
      errors["assetCost"] = "Field is empty";
    }

    if (!fields["financeAmount"]) {
      formIsValid = false;
      errors["financeAmount"] = "Field is empty";
    }

    if (!fields["companyName"]) {
      formIsValid = false;
      errors["companyName"] = "Field is empty";
    }

    if (!fields["tradingName"]) {
      formIsValid = false;
      errors["tradingName"] = "Field is empty";
    }

    if (!fields["ABN"]) {
      formIsValid = false;
      errors["ABN"] = "Field is empty";
    }

    if (!fields["fullName"]) {
      formIsValid = false;
      errors["fullName"] = "Field is empty";
    }

    if (!fields["address"]) {
      formIsValid = false;
      errors["address"] = "Field is empty";
    }

    if (!fields["addressState"]) {
      formIsValid = false;
      errors["addressState"] = "Field is empty";
    }

    if (!fields["postCode"]) {
      formIsValid = false;
      errors["postCode"] = "Field is empty";
    }

    if (!fields["licence"]) {
      formIsValid = false;
      errors["licence"] = "Field is empty";
    }

    if (!fields["cash"]) {
      formIsValid = false;
      errors["cash"] = "Field is empty";
    }

    if (!fields["propertiesValue"]) {
      formIsValid = false;
      errors["propertiesValue"] = "Field is empty";
    }

    if (!fields["vehiclesAmount"]) {
      formIsValid = false;
      errors["vehiclesAmount"] = "Field is empty";
    }

    if (!fields["otherMortgage"]) {
      formIsValid = false;
      errors["otherMortgage"] = "Field is empty";
    }

    if (!fields["sharesTermDeposits"]) {
      formIsValid = false;
      errors["sharesTermDeposits"] = "Field is empty";
    }

    if (!fields["creditCard"]) {
      formIsValid = false;
      errors["creditCard"] = "Field is empty";
    }

    if (!fields["otherLiabilities"]) {
      formIsValid = false;
      errors["otherLiabilities"] = "Field is empty";
    }

    setErrors(errors);
    return formIsValid;
  };

  const canSave = !isLoading;

  const onSaveApplicationClicked = async (e) => {
    e.preventDefault();
    handleValidation();
    if (Object.keys(errors).length === 0 && canSave) {
      await addNewApplication(
        fields,
      );
    } else alert("Form has errors.");
  };

  const errClass = isError ? "errmsg" : "offscreen";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveApplicationClicked}>
        <h1>New Asset Finance Application:</h1>
        <label className="form__label" htmlFor="title">
          Finance Type:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <Select
          options={[
            { value: "lease", label: "Finance Lease" },
            { value: "purchase", label: "Hire Purchase" },
            { value: "mortgage", label: "Chattel Mortgage" },
          ]}
          name="financeType"
          className={`form__select`}
          id="financeType"
          placeholder="Select an option"
          onChange={(option) => handleChange("financeType", option)}
        />

        <label className="form__label" htmlFor="title">
          Car OR Asset (Full Details):&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <input
          className={`form__input`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={fields["title"]}
          placeholder="i.e 2021 Frozen Yogurt machine JF1234"
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <label className="form__label" htmlFor="assetCost">
          New / Used:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <Select
          options={[
            { value: "new", label: "New" },
            { value: "used", label: "Used" },
          ]}
          name="newUsed"
          className={`form__select`}
          id="newUsed"
          placeholder="Select an option"
          onChange={(option) => handleChange("newUsed", option)}
        />
        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="assetCost">
              Asset Cost:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="assetCost"
              name="assetCost"
              type="number"
              placeholder="Enter amount"
              value={fields["assetCost"]}
              onChange={(e) =>
                handleChange("assetCost", parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label className="form__label" htmlFor="deposit">
              Deposit:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="deposit"
              name="deposit"
              type="number"
              value={fields["deposit"]}
              placeholder="Enter amount"
              onChange={(e) =>
                handleChange("deposit", parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label className="form__label" htmlFor="financeAmount">
              Total Amount Finance:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input `}
              id="financeAmount"
              name="financeAmount"
              type="number"
              value={fields["financeAmount"]}
              placeholder="Enter amount"
              onChange={(e) =>
                handleChange("financeAmount", parseInt(e.target.value, 10))
              }
            />
          </div>
        </div>

        <h3>Business Details:</h3>

        <label className="form__label" htmlFor="companyName">
          Company Name:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <input
          className={`form__input`}
          id="companyName"
          name="companyName"
          type="text"
          value={fields["companyName"]}
          placeholder="Enter Company Name"
          onChange={(e) => handleChange("companyName", e.target.value)}
        />

        <label className="form__label" htmlFor="tradingName">
          Trading Name:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <input
          className={`form__input`}
          id="tradingName"
          name="tradingName"
          type="text"
          autoComplete="off"
          value={fields["tradingName"]}
          placeholder="Enter Trading Name"
          onChange={(e) => handleChange("tradingName", e.target.value)}
        />

        <label className="form__label" htmlFor="ABN">
          ABN:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <input
          className={`form__input`}
          id="ABN"
          name="ABN"
          type="number"
          value={fields["ABN"]}
          placeholder="Enter ABN Number"
          onChange={(e) => handleChange("ABN", parseInt(e.target.value, 10))}
        />

        <h3>Director / Propriet details:</h3>

        <label className="form__label" htmlFor="fullName">
          Full Name:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <input
          className={`form__input`}
          id="fullName"
          name="fullName"
          type="text"
          value={fields["fullName"]}
          placeholder="Enter Full Name"
          onChange={(e) => handleChange("fullName", e.target.value)}
        />

        <label className="form__label" htmlFor="address">
          Address:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>
        <input
          className={`form__input`}
          id="address"
          name="address"
          type="text"
          value={fields["address"]}
          placeholder="Enter Address"
          onChange={(e) => handleChange("address", e.target.value)}
        />

        <label className="form__label" htmlFor="addressState">
          State:&nbsp;
        </label>
        <span className="error">{errors["title"]}</span>

        <Select
          options={[
            { value: "queensland", label: "Queensland" },
            { value: "newSouthWales", label: "New South Wales" },
            { value: "victoria", label: "Victoria" },
            { value: "westernAustralia", label: "Western Australia" },
            { value: "southAustralia", label: "South Australia" },
            { value: "tasmania", label: "Tasmania" },
            { value: "northernTerritory", label: "Northern Territory" },
            {
              value: "australianCapitalTerritory",
              label: "Australian Capital Territory",
            },
          ]}
          name="selectState"
          className={`form__select`}
          id="addressState"
          placeholder="Select State"
          onChange={(option) => handleChange("addressState", option)}
        />

        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="postCode">
              Post Code:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="postCode"
              name="postCode"
              type="text"
              value={fields["postCode"]}
              placeholder="Enter Postcode"
              onChange={(e) =>
                handleChange("postCode", parseInt(e.target.value, 10))
              }
            />
          </div>
          <div>
            <label className="form__label" htmlFor="licence">
              Driver's Licence:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="licence"
              name="licence"
              type="number"
              value={fields["licence"]}
              placeholder="Enter licence"
              onChange={(e) =>
                handleChange("licence", parseInt(e.target.value, 10))
              }
            />
          </div>
        </div>

        <h3>Statement of Financial Position - Personal Assets</h3>
        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="cash">
              Cash:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="cash"
              name="cash"
              type="number"
              value={fields["cash"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("cash", parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label className="form__label" htmlFor="propertiesValue">
              Properties Value:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="propertiesValue"
              name="propertiesValue"
              type="number"
              value={fields["propertiesValue"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("propertiesValue", parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label className="form__label" htmlFor="vehiclesAmount">
              Vehicles Amount:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="vehiclesAmount"
              name="vehiclesAmount"
              type="number"
              value={fields["vehiclesAmount"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("vehiclesAmount", parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label className="form__label" htmlFor="sharesTermDeposits">
              Shares/Term deposits:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="sharesTermDeposits"
              name="sharesTermDeposits"
              type="number"
              value={fields["sharesTermDeposits"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("sharesTermDeposits", parseInt(e.target.value, 10))
              }
            />
          </div>
        </div>

        <h3>Statement of Financial Position - Personal Liabilities</h3>
        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="homeMortgage">
              Home Mortgage:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="homeMortgage"
              name="homeMortgage"
              type="number"
              value={fields["homeMortgage"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("homeMortgage", parseInt(e.target.value, 10))
              }
            />
          </div>
          <div>
            <label className="form__label" htmlFor="otherMortgage">
              Other Mortgage:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="otherMortgage"
              name="otherMortgage"
              type="number"
              value={fields["otherMortgage"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("otherMortgage", parseInt(e.target.value, 10))
              }
            />
          </div>
          <div>
            <label className="form__label" htmlFor="creditCard">
              Credit Card (limits):&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="creditCard"
              name="creditCard"
              type="number"
              value={fields["creditCard"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("creditCard", parseInt(e.target.value, 10))
              }
            />
          </div>

          <div>
            <label className="form__label" htmlFor="otherLiabilities">
              Other Liabilities:&nbsp;
            </label>
            <span className="error">{errors["title"]}</span>
            <input
              className={`form__input`}
              id="otherLiabilities"
              name="otherLiabilities"
              type="number"
              value={fields["otherLiabilities"]}
              placeholder="Enter Amount"
              onChange={(e) =>
                handleChange("otherLiabilities", parseInt(e.target.value, 10))
              }
            />
          </div>
        </div>

        <button disabled={!canSave} className="form__submit-button">
          Submit
        </button>
      </form>
    </>
  );

  return content;
};

export default NewApplicationForm;
