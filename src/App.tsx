import { useState } from "react";

import Style from "./App.module.css";
import { useThirtyOneSystemCard } from "./hooks/use-thirty-one-system-card";

function App() {
  const [betPerUnit, setBetPerUnit] = useState(10);
  const [card01, profitsCard01, resetStateCard01, resetProfitsCard01] = useThirtyOneSystemCard({
    title: "First Lane",
    perUnit: betPerUnit,
  });
  const [card02, profitsCard02, resetStateCard02, resetProfitsCard02] = useThirtyOneSystemCard({
    title: "Second Lane",
    perUnit: betPerUnit,
  });
  const [card03, profitsCard03, resetStateCard03, resetProfitsCard03] = useThirtyOneSystemCard({
    title: "Third Lane",
    perUnit: betPerUnit,
  });

  const allProfits = profitsCard01 + profitsCard02 + profitsCard03;

  function clickResetState() {
    resetStateCard01();
    resetStateCard02();
    resetStateCard03();
  }

  function clickResetProfits() {
    resetProfitsCard01();
    resetProfitsCard02();
    resetProfitsCard03();
  }

  const styleProfits = allProfits < 0 ? Style.Akaji : "";

  return (
    <>
      <nav className="navbar is-primary">
        <div className="bulma-navbar-burger">
          <a className="navbar-item" style={{ height: "100%" }}>
            Triple 31 System
          </a>
        </div>
      </nav>
      <div className="container pt-5">
        <div className="is-flex is-justify-content-center">
          <div className="card" style={{ width: "600px" }}>
            <header className="card-header">
              <p className="card-header-title">Form</p>
            </header>
            <div className="card-content">
              <div className="field">
                <label className="label">All Profits</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    value={betPerUnit}
                    onChange={(e) => setBetPerUnit(Number(e.target.value))}
                  />
                </div>
                <label className="label">Bet per unit</label>
                <div className="control">
                  <input
                    className={`input ${styleProfits}`}
                    type="number"
                    value={allProfits}
                    disabled
                  />
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <p className={`card-footer-item ${Style.FooterButton}`} onClick={clickResetState}>
                Reset All State
              </p>
              <p className={`card-footer-item ${Style.FooterButton}`} onClick={clickResetProfits}>
                Reset All Profits
              </p>
            </footer>
          </div>
        </div>
        <hr />
        <div className="is-flex is-justify-content-space-around">
          {card01}
          {card02}
          {card03}
        </div>
      </div>
    </>
  );
}

export default App;
