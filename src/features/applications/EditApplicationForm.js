import { useState, useEffect } from "react";

import Select from "react-select";
import { useNavigate } from "react-router-dom";

import {
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} from "./applicationsApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditApplicationForm = ({ application }) => {
  const [updateApplication, { isLoading, isSuccess, isError, error }] =
    useUpdateApplicationMutation();

  const [
    deleteApplication,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteApplicationMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(application.title);
  const [assetCost, setAssetCost] = useState(application.assetCost);
  const [deposit, setDeposit] = useState(application.deposit);
  const [financeAmount, setFinanceAmount] = useState(application.financeAmount);
  const [companyName, setCompanyName] = useState(application.companyName);
  const [tradingName, setTradingName] = useState(application.tradingName);
  const [ABN, setABN] = useState(application.ABN);
  const [fullName, setFullName] = useState(application.fullName);
  const [address, setAddress] = useState(application.address);
  const [addressState, setAddressState] = useState(application.addressState);
  const [postCode, setPostCode] = useState(application.postCode);
  const [licence, setLicence] = useState(application.licence);
  const [cash, setCash] = useState(application.cash);
  const [propertiesValue, setPropertiesValue] = useState(
    application.propertiesValue
  );
  const [vehiclesAmount, setVehiclesAmount] = useState(
    application.vehiclesAmount
  );
  const [sharesTermDeposits, setSharesTermDeposits] = useState(
    application.sharesTermDeposits
  );
  const [homeMortgage, setHomeMortgage] = useState(application.homeMortgage);
  const [otherMortgage, setOtherMortgage] = useState(
    application.otherLiabilities
  );
  const [creditCard, setCreditCard] = useState(application.creditCard);
  const [otherLiabilities, setOtherLiabilities] = useState(
    application.otherLiabilities
  );
  const [selectedFinanceType, setSelectedFinanceType] = useState(
    application.financeType
  );
  const [selectedNewUsedType, setSelectedNewUsedType] = useState(
    application.newUsedType
  );

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      navigate("/dash/applications");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const canSave = [title].every(Boolean) && !isLoading;

  const onSaveApplicationClicked = async (e) => {
    if (canSave) {
      await updateApplication({
        id: application.id,
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

  const onDeleteApplicationClicked = async () => {
    await deleteApplication({ id: application.id });
  };

  const created = new Date(application.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(application.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !title ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Application #{application.ticket}</h2>
          <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteApplicationClicked}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
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
          value={selectedFinanceType}
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
          value={selectedNewUsedType}
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
          value={addressState}
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

        <div className="form__divider">
          <p className="form__created">
            Created:
            <br />
            {created}
          </p>
          <p className="form__updated">
            Updated:
            <br />
            {updated}
          </p>
        </div>

        <button
          disabled={!canSave}
          className="form__submit-button"
          onClick={onSaveApplicationClicked}
        >
          Save
        </button>
      </form>
    </>
  );

  return content;
};

export default EditApplicationForm;
