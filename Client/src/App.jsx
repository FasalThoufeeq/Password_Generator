import { useEffect, useState } from "react";
import "./App.css";
import Checkbox from "./Components/Checkbox";
import { GetSavedPassword, savePassword } from "../Api calls/userApi";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [render, setRender] = useState(false);
  const [toFive, setToFive] = useState([]);
  const [toTen, setToTen] = useState([]);
  const [toFifteen, setToFifteen] = useState([]);
  const [toTwenty, setToTwenty] = useState([]);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };
  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };
  const generatePassword = () => {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setPassword(characters.join(""));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  };

  const [expanded, setExpanded] = useState(false);
  const handleExpand = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };
  const savePasswordHandler = async () => {
    const response = await savePassword({ password: password });
    setRender(!render);
    if (response?.status === "success") {
      toast(response?.message);
    }
  };

  useEffect(() => {
    const getpasswords = async () => {
      const response = await GetSavedPassword();
      console.log(response, "res");
      if (response?.status === "success") {
        setSavedPasswords(response?.savedPasswords);
      }
    };
    getpasswords();
  }, [render]);

  useEffect(() => {
    if (savedPasswords) {
      const filteredToFive = savedPasswords.filter(
        (password) => password?.length <= 5
      );
      const filteredToTen = savedPasswords.filter(
        (password) => password?.length > 5 && password?.length <= 10
      );
      const filteredToFifteen = savedPasswords.filter(
        (password) => password?.length > 10 && password?.length <= 15
      );
      const filteredToTwenty = savedPasswords.filter(
        (password) => password?.length > 15 && password?.length <= 20
      );
      setToFive(filteredToFive);
      setToTen(filteredToTen);
      setToFifteen(filteredToFifteen);
      setToTwenty(filteredToTwenty);
    }
  }, [savedPasswords]);

  return (
    <>
      <div className="wrapper">
        <div className="container wrapper-box">
          <h2>Password Generator</h2>
          <div className="password-box">
            <input
              type="text"
              value={password}
              placeholder="Your Password is here"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="copy-button"
              onClick={() => {
                if (password.length > 0) {
                  navigator.clipboard.writeText(password);
                  setCopied(true);
                  setInterval(() => {
                    setCopied(false);
                  }, 2000);
                }
              }}
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
          </div>
          <br />
          <div className="password-criteria-box">
            <div>
              <label>Password length</label>
            </div>
            <div>
              <input
                type="number"
                min="4"
                max="20"
                value={passwordGen.length}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>
          </div>
          <div className="password-criteria-box">
            <div>
              <label>Include uppercase letters</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.uppercase}
                onChange={handleChangeUppercase}
              />
            </div>
          </div>
          <div className="password-criteria-box">
            <div>
              <label>Include lowercase letters</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.lowercase}
                onChange={handleChangeLowercase}
              />
            </div>
          </div>
          <div className="password-criteria-box">
            <div>
              <label>Include numbers</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.numbers}
                onChange={handleChangeNumbers}
              />
            </div>
          </div>
          <div className="password-criteria-box">
            <div>
              <label>Include symbols</label>
            </div>
            <div>
              <Checkbox
                value={passwordGen.symbols}
                onChange={handleChangeSymbols}
              />
            </div>
          </div>
          <div>
            <button className="generate-button" onClick={generatePassword}>
              Generate password
            </button>
            {password ? (
              <button className="generate-button" onClick={savePasswordHandler}>
                Save to best passwords list
              </button>
            ) : null}
          </div>
        </div>
        <div className="container wrapper-box">
          <h2>Saved Passwords By Users</h2>

          <br />

          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={(event, isExpanded) =>
                handleExpand(isExpanded, "panel1")
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Password Length 0-5</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {toFive.length > 0 ? (
                  toFive.map((password, index) => (
                    <Typography key={index}>{`${index + 1}. ${
                      password?.password
                    }`}</Typography>
                  ))
                ) : (
                  <Typography>No Password Saved with this length</Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={(event, isExpanded) =>
                handleExpand(isExpanded, "panel2")
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Password Length 6-10</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {toTen.length > 0 ? (
                  toTen.map((password, index) => (
                    <Typography key={index}>{`${index + 1}. ${
                      password?.password
                    }`}</Typography>
                  ))
                ) : (
                  <Typography>No Password Saved with this length</Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={(event, isExpanded) =>
                handleExpand(isExpanded, "panel3")
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Password Length 11-15</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {toFifteen.length > 0 ? (
                    toFifteen.map((password, index) => (
                      <Typography key={index}>{`${index + 1}. ${
                        password?.password
                      }`}</Typography>
                    ))
                  ) : (
                    <Typography>No Password Saved with this length</Typography>
                  )}
                </Typography>
                <br />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={(event, isExpanded) =>
                handleExpand(isExpanded, "panel4")
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Password Length 16-20</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {toTwenty.length > 0 ? (
                    toTwenty.map((password, index) => (
                      <Typography key={index}>{`${index + 1}. ${
                        password?.password
                      }`}</Typography>
                    ))
                  ) : (
                    <Typography>No Password Saved with this length</Typography>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
