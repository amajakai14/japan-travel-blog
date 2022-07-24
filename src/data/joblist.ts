export interface JOBLIST {
  zipcode: number;
  province: string;
  district: string;
  amphoe: string;
  job_description: string;
  wage: string;
  company_name: string;
  job_type: number;
}
export const jobList: JOBLIST[] = [
  {
    zipcode: 11120,
    province: "นนทบุรี",
    district: "ปากเกร็ด",
    amphoe: "บางพูด",
    job_description: "ปั้นดินเผา",
    wage: "500บาท/วัน",
    company_name: "ABC.co.th",
    job_type: 1,
  },
  {
    zipcode: 11120,
    province: "นนทบุรี",
    district: "ปากเกร็ด",
    amphoe: "ปากเกร็ด",
    job_description: "เฝ้าร้าน",
    wage: "4000บาท/สัปดาห์",
    company_name: "ZZZ.co.th",
    job_type: 2,
  },
];
