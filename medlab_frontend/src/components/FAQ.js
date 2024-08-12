import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./../assets/css/FAQ.css"; 

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container id="faq" className="faq-container">
      <Typography component="h2" variant="h4" className="faq-title">
        Frequently asked questions
      </Typography>
      <div className="faq-accordion">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
            className="faq-accordion-summary"
          >
            <Typography component="h3" variant="subtitle2">
              How can I schedule an appointment for a lab test?
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="faq-accordion-details">
            <Typography
              variant="body2"
              gutterBottom
              className="faq-accordion-content"
            >
              To schedule an appointment for a lab test, please visit our
              website or contact our scheduling office . You can choose a
              convenient time slot and provide necessary information for your
              visit.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
            className="faq-accordion-summary"
          >
            <Typography component="h3" variant="subtitle2">
              What should I bring with me to my lab appointment?
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="faq-accordion-details">
            <Typography
              variant="body2"
              gutterBottom
              className="faq-accordion-content"
            >
              Please bring a valid ID, your insurance information, and any
              required referral documents. If you have specific instructions
              from your physician, make sure to bring those as well.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
            className="faq-accordion-summary"
          >
            <Typography component="h3" variant="subtitle2">
              How long will it take to receive my test results?
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="faq-accordion-details">
            <Typography
              variant="body2"
              gutterBottom
              className="faq-accordion-content"
            >
              Test results are typically available within some days. You will be
              notified via email or phone call once your results are ready. If
              you have any urgent concerns, please contact us directly.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
            className="faq-accordion-summary"
          >
            <Typography component="h3" variant="subtitle2">
              What should I do if I have questions about my test results?
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="faq-accordion-details">
            <Typography
              variant="body2"
              gutterBottom
              className="faq-accordion-content"
            >
              If you have questions or need clarification about your test
              results, please contact your healthcare provider. For additional
              assistance, you can reach out to our support team.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}