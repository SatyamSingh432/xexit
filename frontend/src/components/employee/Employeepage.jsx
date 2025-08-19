/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./EmployeePage.css";
import {
  submitResignation,
  getResignationStatus,
  submitQuestionnaire,
  verifyToken,
} from "../../utils/apis.js";

const QuesOne = "1. Why are you leaving this position?";
const QuesTwo = "2. Do you think the company supported your career goals?";

const EmployeePage = () => {
  const [empName, setEmpName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [resignForm, setResignForm] = useState(true);
  const [status, setStatus] = useState("pending");
  const [showQues, setShowQues] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  useEffect(() => {
    const verifyuser = async () => {
      const res = await verifyToken(token);
      console.log(res);
      setEmpName(res.username);
      setIsAdmin(res.is_admin);
    };
    verifyuser();
  }, []);

  const [resignData, setResignData] = useState({
    date: "",
  });
  const [questionnaires, setQuestionnaires] = useState({
    ans1: "",
    ans2: "",
  });

  const fetchResignationStatus = async () => {
    const res = await getResignationStatus(token);
    setStatus(res.resignation_status);
    console.log(res.resignation_status);
    if (res.resignation_status === "rejected") return setResignForm(false);

    if (res.resignation_status === "pending") return setResignForm(false);
    const isResignationApproved = res.resignation_status === "approved";
    if (isResignationApproved) {
      setShowQues(true);
    }
    setResignForm(!isResignationApproved);
  };

  useEffect(() => {
    fetchResignationStatus();
  }, []);

  const resignDataHandler = async (e) => {
    e.preventDefault();
    const { date } = resignData;
    setResignData({
      date: "",
    });
    const res = await submitResignation(date, token);
    setResignForm(false);
    console.log(res);
    setStatus("pending");
  };
  const questionnairesDataHandler = async (e) => {
    e.preventDefault();
    const { ans1, ans2 } = questionnaires;
    setQuestionnaires({
      ans1: "",
      ans2: "",
    });

    const responses = [
      { questionText: QuesOne, response: ans1 },
      { questionText: QuesTwo, response: ans2 },
    ];
    await submitQuestionnaire(responses, token);
    alert("questionnaire form submitted");
  };

  const resignDataChange = (e) => {
    setResignData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const questionnairesDataChange = (e) => {
    setQuestionnaires((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="em-resign-container">
      <nav className="em-resign-nav">
        <p className="em-resign-nav-opt">User Name : </p>
        <p className="em-resign-nav-opt">{empName}</p>
        <button
          className="wel-nav-btn"
          style={{ backgroundColor: "black", color: "white" }}
          onClick={() => {
            logoutHandler();
          }}
        >
          log out
        </button>
      </nav>
      <main className="em-resign-form-container">
        {resignForm ? (
          <form className="em-resign-form" onSubmit={resignDataHandler}>
            <h2>Resign Form</h2>

            <label className="em-resign-label">Last Working Day</label>
            <input
              className="em-resign-input"
              type="date"
              name="date"
              id=""
              value={resignData.date}
              required
              onChange={resignDataChange}
            />

            <button className="em-resign-submit" type="submit">
              Submit
            </button>
            <p className="side-details">
              When Approved Questioner Form will Open, wait for some time.
            </p>
          </form>
        ) : showQues ? (
          <form className="em-resign-form" onSubmit={questionnairesDataHandler}>
            <h2>Resign Accepted Fill Questionnaire Form</h2>
            <label className="em-resign-label">{QuesOne}</label>
            <textarea
              className="em-resign-textarea"
              name="ans1"
              required
              id=""
              value={questionnaires.ans1}
              placeholder="Enter here..."
              onChange={questionnairesDataChange}
            />
            <label className="em-resign-label">{QuesTwo}</label>
            <textarea
              className="em-resign-textarea"
              name="ans2"
              required
              id=""
              value={questionnaires.ans2}
              onChange={questionnairesDataChange}
              placeholder="Enter here..."
            />
            <button className="em-resign-submit" type="submit">
              Submit
            </button>
          </form>
        ) : (
          <div className="status-dis">
            <div className="status-head">{`Resignation Status : ${status}`}</div>
            <p className="status-txt">
              {status === "pending"
                ? "Wait for HR to approve resignation"
                : "your application got rejected"}
            </p>
            <button
              className="wel-nav-btn"
              onClick={() => {
                fetchResignationStatus();
              }}
            >
              check status
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeePage;
