import {
  DailyWage,
  HoulyWage,
  WeeklyWage,
  BiWeeklyWage,
  MonthlyWage,
} from "../components/conditions/WageRange";
import Navbar from "../components/Navbar";
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import WorkingArea from "../components/conditions/WorkingArea";
import CSS from "csstype";
import { jobList, JOBLIST } from "../data/joblist";
export interface SearchCondition {
  zipcode: number | null;
  province: string | null;
  district: string | null;
  amphoe: string | null;
  job_type: number | null;
}

function EmployeesPage() {
  const [wageType, setWageType] = useState("hourly");
  const [job, setJob] = useState<JOBLIST[]>([]);

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
  const textAreaStyle: CSS.Properties = {
    boxShadow: "0 0 2pt grey",
  };
  const handleSubmit = () => {
    console.log(jobList);
    const ZipCode: string = (
      document.getElementById("ZipCode") as HTMLInputElement
    )?.value;
    const Province: string = (
      document.getElementById("Province") as HTMLSelectElement
    )?.value;

    const Amphoe: string = (
      document.getElementById("SubDistrict") as HTMLSelectElement
    )?.value;
    const District: string = (
      document.getElementById("District") as HTMLSelectElement
    )?.value;
    const JobType: string = (
      document.getElementById("job_type") as HTMLSelectElement
    )?.value;
    const inputData: SearchCondition = {
      zipcode: parseInt(ZipCode),
      province: Province,
      district: District,
      amphoe: Amphoe,
      job_type: parseInt(JobType),
    };
    const findJob = jobList.filter(
      (job) =>
        job.zipcode === inputData.zipcode &&
        job.province === inputData.province &&
        job.job_type === inputData.job_type
    );
    console.log(findJob);
    setJob(findJob);
  };
  return (
    <>
      <Navbar />
      <div className="text-3xl">
        &lt; DEMO Work ทำไว้แค่สองชุด ใส่รหัสปณ 11120 สลับประเภทงาน ก ข &gt;
      </div>
      <div>
        <div>ผู้ต้องการหางาน</div>
        <div className="">
          <div className="flex px-4">
            <div>
              <span className="px-2">ประเภทค่าจ้าง</span>
              <select
                name="wage_types"
                id="wage_types"
                onChange={(e) => handleWageType(e)}
                className="rounded-md outline-none border-none"
                style={textAreaStyle}
              >
                <option value="hourly">รายชั่วโมง</option>
                <option value="daily">รายวัน</option>
                <option value="weekly">รายสัปดาห์</option>
                <option value="biweekly">รายสองสัปดาห์</option>
                <option value="monthly">รายเดือน</option>
              </select>
            </div>
            <div className="flex px-4">
              <span className="px-2">ค่าแรงที่ประสงค์</span>
              <RenderWageRange />
            </div>
          </div>
          <div>
            <div>สถานที่ทำงาน</div>
            <WorkingArea />
          </div>
          <div className="flex">
            <span className="px-2">ประเภทงาน</span>
            <select
              name="job_type"
              id="job_type"
              className="rounded-md outline-none border-none"
              style={textAreaStyle}
            >
              <option value="1">ก</option>
              <option value="2">ข</option>
              <option value="3">ค</option>
              <option value="4">ง</option>
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-300 p-2 rounded-full hover:opacity-70 "
      >
        Search
      </button>
      {/* งาน */}
      {job.length === 0 ? <div>Work not Found!</div> : <div>Found a Job!</div>}
      {job &&
        job.map((j, index) => {
          return (
            <div>
              <div key={`comp_${index}`}>ชื่อบริษัท{j.company_name}</div>
              <div key={`jd_${index}`}>รายละเอียดงาน {j.job_description}</div>
              <div key={`wage_offer${index}`}>ค่าแรง:{j.wage}</div>
              <div
                key={`company_address${index}`}
              >{`ข้อมูลที่อยู่บริษัท จังหวัด:${j.province} ตำบล:${j.district} อำเภอ:${j.amphoe}`}</div>
              <div></div>
            </div>
          );
        })}
    </>
  );
}

export default EmployeesPage;
