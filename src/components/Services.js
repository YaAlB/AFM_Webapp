import React from "react";

import Navbar from "./NavBar/NavBar";

import factory from "../assets/icons/factory.png";
import industrialRobot from "../assets/icons/industrialRobot.png";
import roadRoller from "../assets/icons/roadRoller.png";

function Services() {
  const servicesData = [
    {
      title: "Asset Finance Specialists",
      description:
        "We are passionate about realising the next success for our clients.",
      icon: factory,
    },
    {
      title: "Managing Your Assets",
      description:
        "Helping businesses maximise asset and infrastructure efficiency to focus on operations.",
      icon: industrialRobot,
    },
    {
      title: "Vendor and Intermediary Finance",
      description:
        "Increase your sales revenue and grow your business by leveraging vendor and intermediary finance for your clients today.",
      icon: roadRoller,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="services-container servicesBg">
        <h1>Our Services</h1>
        <div className="service-cards">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h1>{service.title}</h1>
              <h2>{service.description}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
