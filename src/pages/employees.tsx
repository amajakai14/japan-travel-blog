import {
  DailyWage,
  HoulyWage,
  WeeklyWage,
  BiWeeklyWage,
  MonthlyWage,
} from "../components/conditions/WageRange";
import Navbar from "../components/Navbar";
import { ChangeEvent, useEffect, useState } from "react";
import locationData from "../data/location";
import WorkingArea from "../components/conditions/WorkingArea";

function EmployeesPage() {
  const [wageType, setWageType] = useState("hourly");

  const handleWageType = (e: ChangeEvent<HTMLSelectElement>) => {
    setWageType(e.target.value);
  };

  const RenderWageRange = () => {
    switch (wageType) {
      case "hourly":
        return <HoulyWage />;
      case "daily":
        return <DailyWage />;
      case "weekly":
        return <WeeklyWage />;
      case "biweekly":
        return <BiWeeklyWage />;
      case "monthly":
        return <MonthlyWage />;
      default:
        return <></>;
    }
  };
  useEffect(() => {}, [wageType]);
  return (
    <>
      <Navbar />
      <div>
        <div>ผู้ต้องการหางาน</div>
        <div className="flex flex-row">
          <div className="flex flex-row">
            <div>ประเภทค่าจ้าง</div>
            <select
              name="wage_types"
              id="wage_types"
              onChange={(e) => handleWageType(e)}
            >
              <option value="hourly">รายชั่วโมง</option>
              <option value="daily">รายวัน</option>
              <option value="weekly">รายสัปดาห์</option>
              <option value="biweekly">รายสองสัปดาห์</option>
              <option value="monthly">รายเดือน</option>
            </select>
            <div>Expected Wage</div>
            <RenderWageRange />
          </div>
          <div>
            <div>Working Area</div>
            <WorkingArea />
          </div>
          <div>
            <div>Job fields</div>
            <div>Job fields input</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeesPage;
