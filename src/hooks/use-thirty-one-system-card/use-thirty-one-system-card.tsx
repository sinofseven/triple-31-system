import { type JSX, useState } from "react";
import { v4 as uuid4 } from "uuid";

import Style from "./use-thirty-one-system-card.module.css";

type PropsUseThirtyOneSystemCard = {
  title?: string;
  perUnit?: number;
};

const LIST_UNIT = [1, 2, 4, 8];

export function useThirtyOneSystemCard({
  title,
  perUnit,
}: PropsUseThirtyOneSystemCard): [JSX.Element, number, () => void, () => void] {
  const [flagCombo, setFlagCombo] = useState(false);
  const [countWin, setCountWin] = useState(0);
  const [countLose, setCountLose] = useState(0);
  const [profits, setProfits] = useState(0);
  const [allTags, setAllTags] = useState<Array<number>>([]);

  function calcUnit() {
    const unit: number | undefined = LIST_UNIT[countWin];
    if (unit == null) {
      return "finish";
    } else {
      return unit;
    }
  }

  function calcBet() {
    if (perUnit == null) {
      return calcUnit();
    }
    const unit: number | undefined = LIST_UNIT[countWin];
    if (unit == null) {
      return "finish";
    } else {
      return unit * perUnit;
    }
  }

  function clickWin() {
    if (countWin === 4) {
      return;
    }
    const currentBet = calcBet();
    if (typeof currentBet === "number") {
      setProfits(profits + currentBet);
      setAllTags(allTags.concat([currentBet]));
    }
    if (flagCombo) {
      setCountWin(4);
      return;
    }
    setCountWin(countWin + 1);
    setCountLose(0);
    setFlagCombo(true);
  }

  function clickLose() {
    if (countWin === 4) {
      return;
    }
    const currentBet = calcBet();
    if (typeof currentBet === "number") {
      setProfits(profits - currentBet);
      setAllTags(allTags.concat([-currentBet]));
    }

    setFlagCombo(false);
    if (countWin === 0 && countLose === 2) {
      setCountWin(1);
      setCountLose(0);
    } else if (countWin > 0 && countLose === 1) {
      setCountWin(countWin + 1);
      setCountLose(0);
    } else {
      setCountLose(countLose + 1);
    }
  }

  function clickResetState() {
    setCountWin(0);
    setCountLose(0);
    setAllTags([]);
    setFlagCombo(false);
  }

  function clickResetProfits() {
    setProfits(0);
  }

  const styleButton = countWin < 4 ? Style.FooterButton : Style.FooterButtonDisabled;
  const styleProfits = profits < 0 ? Style.Akaji : "";
  const nextUnit = calcUnit();
  const nextBet = calcBet();

  const elmAllTags = allTags.map((v) => {
    const color = v > 0 ? "is-success" : "is-danger";
    return (
      <span className={`tag ${color}`} key={uuid4()}>
        {v}
      </span>
    );
  });

  const element = (
    <div className={`card ${Style.SystemCard}`}>
      <header className="card-header">
        <p className="card-header-title">{title == null ? "31 System" : title}</p>
      </header>
      <div className="card-content">
        <p className="is-flex is-justify-content-space-around" style={{ height: "30px" }}>
          {elmAllTags}
        </p>
        <div className="is-flex is-justify-content-center">
          <table className="table">
            <tbody>
              <tr>
                <th>Next Unit</th>
                <td>{nextUnit}</td>
              </tr>
              <tr>
                <th>Next Bet</th>
                <td>{nextBet}</td>
              </tr>
              <tr>
                <th>profits</th>
                <td className={styleProfits}>{profits}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer className="card-footer">
        <p className={`card-footer-item ${styleButton}`} onClick={clickWin}>
          Win
        </p>
        <p className={`card-footer-item ${styleButton}`} onClick={clickLose}>
          Lose
        </p>
        <p className={`card-footer-item ${Style.FooterButton}`} onClick={clickResetState}>
          Reset State
        </p>
        <p className={`card-footer-item ${Style.FooterButton}`} onClick={clickResetProfits}>
          Reset Profits
        </p>
      </footer>
    </div>
  );

  function resetState() {
    clickResetState();
  }

  function resetProfits() {
    clickResetProfits();
  }

  return [element, profits, resetState, resetProfits];
}
