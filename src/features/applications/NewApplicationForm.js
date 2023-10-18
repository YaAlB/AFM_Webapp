import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { useAddNewApplicationMutation } from "./applicationsApiSlice";

const NewApplicationForm = () => {
  const [addNewApplication, { isLoading, isSuccess, isError, error }] =
    useAddNewApplicationMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [assetCost, setAssetCost] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [financeAmount, setFinanceAmount] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [ABN, setABN] = useState(0);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [addressState, setAddressState] = useState("");
  const [postCode, setPostCode] = useState(0);
  const [licence, setLicence] = useState(0);
  const [cash, setCash] = useState(0);
  const [propertiesValue, setPropertiesValue] = useState(0);
  const [vehiclesAmount, setVehiclesAmount] = useState(0);
  const [sharesTermDeposits, setSharesTermDeposits] = useState(0);
  const [homeMortgage, setHomeMortgage] = useState(0);
  const [otherMortgage, setOtherMortgage] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [otherLiabilities, setOtherLiabilities] = useState(0);
  const [selectedFinanceType, setSelectedFinanceType] = useState(null);
  const [selectedNewUsedType, setSelectedNewUsedType] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      navigate("/dash/applications");
    }
  }, [title, isSuccess, navigate]);

  const canSave = [title].every(Boolean) && !isLoading;

  const onSaveApplicationClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewApplication({
        title,
        financeType: selectedFinanceType,
        newUsedType: selectedNewUsedType,
        assetCost,
        deposit,
        financeAmount,
        companyName,
        tradingName,
        ABN,
        fullName,
        address,
        addressState,
        postCode,
        licence,
        cash,
        propertiesValue,
        vehiclesAmount,
        sharesTermDeposits,
        otherMortgage,
        creditCard,
        otherLiabilities,
      });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !title ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveApplicationClicked}>
        <h1>New Asset Finance Application:</h1>
        <label className="form__label" htmlFor="title">
          Finance Type:
        </label>
        <Select
          options={[
            { value: "lease", label: "Finance Lease" },
            { value: "purchase", label: "Hire Purchase" },
            { value: "mortgage", label: "Chattel Mortgage" },
          ]}
          name="financeType"
          className={`form__select ${validTextClass}`}
          id="financeType"
          onChange={(option) => {
            setSelectedFinanceType(option);
          }}
        />
        <label className="form__label" htmlFor="title">
          Car OR Asset (Full Details):
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="form__label" htmlFor="assetCost">
          New / Used:
        </label>
        <Select
          options={[
            { value: "new", label: "New" },
            { value: "used", label: "Used" },
          ]}
          name="newUsed"
          className={`form__select ${validTextClass}`}
          id="newUsed"
          onChange={(option) => {
            setSelectedNewUsedType(option);
          }}
        />
        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="assetCost">
              Asset Cost:
            </label>
            <input
              className={`form__input ${validTitleClass}`}
              id="assetCost"
              name="assetCost"
              type="number"
              autoComplete="off"
              value={assetCost}
              onChange={(e) => setAssetCost(parseInt(e.target.value, 10))}
            />
          </div>

          <div>
            <label className="form__label" htmlFor="deposit">
              Deposit:
            </label>
            <input
              className={`form__input ${validTitleClass}`}
              id="deposit"
              name="deposit"
              type="number"
              autoComplete="off"
              value={deposit}
              onChange={(e) => setDeposit(parseInt(e.target.value, 10))}
            />
          </div>

          <div>
            <label className="form__label" htmlFor="financeAmount">
              Total Amount Finance:
            </label>
            <input
              className={`form__input ${validTitleClass}`}
              id="financeAmount"
              name="financeAmoutn"
              type="number"
              autoComplete="off"
              value={financeAmount}
              onChange={(e) => setFinanceAmount(parseInt(e.target.value, 10))}
            />
          </div>
        </div>

        <h3>Business Details:</h3>

        <label className="form__label" htmlFor="companyName">
          Company Name:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="companyName"
          name="companyName"
          type="text"
          autoComplete="off"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label className="form__label" htmlFor="tradingName">
          Trading Name:
        </label>
        <input
          className={`form__input ${validTextClass}`}
          id="tradingName"
          name="tradingName"
          type="text"
          autoComplete="off"
          value={tradingName}
          onChange={(e) => setTradingName(e.target.value)}
        />

        <label className="form__label" htmlFor="ABN">
          ABN:
        </label>
        <input
          className={`form__input ${validTextClass}`}
          id="ABN"
          name="ABN"
          type="number"
          value={ABN}
          onChange={(e) => setABN(parseInt(e.target.value, 10))}
        />

        <h3>Director / Propriet details:</h3>

        <label className="form__label" htmlFor="fullName">
          Full Name:
        </label>
        <input
          className={`form__input ${validTextClass}`}
          id="fullName"
          name="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label className="form__label" htmlFor="address">
          Address:
        </label>
        <input
          className={`form__input ${validTextClass}`}
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="form__label" htmlFor="addressState">
          State:
        </label>

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
          className={`form__select ${validTextClass}`}
          id="addressState"
          onChange={(option) => setAddressState(option)}
        />

        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="postCode">
              Post Code:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="postCode"
              name="postCode"
              type="text"
              value={postCode}
              onChange={(e) => setPostCode(parseInt(e.target.value, 10))}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="licence">
              Driver's Licence:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="licence"
              name="licence"
              type="text"
              value={licence}
              onChange={(e) => setLicence(parseInt(e.target.value, 10))}
            />
          </div>
        </div>

        <h3>Statement of Financial Position - Personal Assets</h3>
        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="cash">
              Cash:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="cash"
              name="cash"
              type="number"
              value={cash}
              onChange={(e) => {
                setCash(parseInt(e.target.value, 10));
              }}
            />
          </div>

          <div>
            <label className="form__label" htmlFor="propertiesValue">
              Properties Value:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="propertiesValue"
              name="propertiesValue"
              type="number"
              value={propertiesValue}
              onChange={(e) => {
                setPropertiesValue(parseInt(e.target.value, 10));
              }}
            />
          </div>

          <div>
            <label className="form__label" htmlFor="vehiclesAmount">
              Vehicles Amount:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="vehiclesAmount"
              name="vehiclesAmount"
              type="number"
              value={vehiclesAmount}
              onChange={(e) => {
                setVehiclesAmount(parseInt(e.target.value, 10));
              }}
            />
          </div>

          <div>
            <label className="form__label" htmlFor="sharesTermDeposits">
              Shares/Term deposits:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="sharesTermDeposits"
              name="sharesTermDeposits"
              type="number"
              value={sharesTermDeposits}
              onChange={(e) => {
                setSharesTermDeposits(parseInt(e.target.value, 10));
              }}
            />
          </div>
        </div>

        <h3>Statement of Financial Position - Personal Liabilities</h3>
        <div className="form__input-row">
          <div>
            <label className="form__label" htmlFor="homeMortgage">
              Home Mortgage:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="homeMortgage"
              name="homeMortgage"
              type="number"
              value={homeMortgage}
              onChange={(e) => {
                setHomeMortgage(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="otherMortgage">
              Other Mortgage:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="otherMortgage"
              name="otherMortgage"
              type="number"
              value={otherMortgage}
              onChange={(e) => {
                setOtherMortgage(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="creditCard">
              Credit Card (limits) :
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="creditCard"
              name="creditCard"
              type="number"
              value={creditCard}
              onChange={(e) => {
                setCreditCard(parseInt(e.target.value, 10));
              }}
            />
          </div>

          <div>
            <label className="form__label" htmlFor="otherLiabilities">
              Other Liabilities:
            </label>
            <input
              className={`form__input ${validTextClass}`}
              id="otherLiabilities"
              name="otherLiabilities"
              type="number"
              value={otherLiabilities}
              onChange={(e) => {
                setOtherLiabilities(parseInt(e.target.value, 10));
              }}
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
