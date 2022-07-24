import { ChangeEvent, FC, useState } from "react";
import locationData from "../../data/location";
import { province_th } from "../../data/province";
import CSS from "csstype";
import { SearchCondition } from "../../pages/employees";
interface SearchProps {
  search: SearchCondition;
  setSearch: any;
}
const WorkingArea: FC = (): JSX.Element => {
  const [provinces, setProvinces] = useState<string[]>(province_th);
  const [districts, setDistricts] = useState<string[]>([]);
  const [amphoe, setAmphoe] = useState<string[]>([]);
  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/(?:^|\D)(\d{5})(?!\d)/g)) {
      // search for location detail
      searchLocation(parseInt(e.target.value));
    } else {
      //do not thing
      setProvinces(province_th);
      setDistricts([]);
      setAmphoe([]);
      console.log("notmatch");
    }
  };

  const searchLocation = (ZipCode: number) => {
    const areaFound = locationData.filter((elem) => elem.zipcode === ZipCode);
    console.log(areaFound);
    if (areaFound.length !== 0) {
      setProvinces([areaFound[0]!.province]);
      let amphoeArray: string[] = [];
      let districtArray: string[] = [];
      areaFound.map((area) => {
        amphoeArray = [...amphoeArray, area.amphoe];
        districtArray = [...districtArray, area.district];
      });
      setAmphoe(distinctArray(amphoeArray));
      setDistricts(distinctArray(districtArray));
    } else {
      setProvinces(province_th);
      setDistricts([]);
      setAmphoe([]);
    }
  };

  const districtComponent = (District: string[]) => {
    if (District.length === 0) return <option></option>;
    const distinctDistrict = District.filter(
      (district, index) => District.indexOf(district) === index
    );

    return (
      <>
        {distinctDistrict.map((district, index) => {
          return (
            <option key={index} value={district}>
              {district}
            </option>
          );
        })}
      </>
    );
  };

  const handleProvince = (e: ChangeEvent<HTMLElement>) => {
    const getProvinces = distinctArray(
      locationData.map((elem) => elem.province)
    );
    console.log(getProvinces);

    const selectedDistrict = e.target as HTMLSelectElement;
    console.log("province", selectedDistrict.value);
    const amphoeFound = locationData.filter(
      (elem) => elem.province === selectedDistrict.value
    );

    const amphoeArray: string[] = distinctArray(
      amphoeFound.map((amp) => amp.amphoe)
    );
    console.log(amphoeArray);
    setAmphoe(amphoeArray);
  };
  const handleDistrict = (e: ChangeEvent<HTMLElement>) => {
    const selectedAmphoe = e.target as HTMLSelectElement;
    const districtFound = locationData.filter(
      (elem) => elem.amphoe === selectedAmphoe.value
    );
    console.log(districtFound);
    const districtsArray = districtFound.map((obj) => obj.district);
    setDistricts(districtsArray);
  };

  function distinctArray(inputArray: string[]) {
    return inputArray.filter(
      (child, index) => inputArray.indexOf(child) === index
    );
  }

  const textAreaStyle: CSS.Properties = {
    boxShadow: "0 0 2pt grey",
  };

  return (
    <div>
      {/* condition */}
      <div className="flex flex-col">
        <span>ประเทศไทย</span>
        <div className="flex p-1">
          <div className="px-2">เลขที่ไปรษณีย์</div>
          <input
            onChange={(e) => handleZipCode(e)}
            name="ZipCode"
            id="ZipCode"
            type="number"
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          />
        </div>
        <div className="flex p-1">
          <div className="px-2">จังหวัด</div>
          <select
            name="Province"
            id="Province"
            onChange={(e) => handleProvince(e)}
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          >
            {provinces.map((province, index) => {
              return (
                <option key={index} value={province}>
                  {province}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex p-1">
          <div className="px-2">แขวง/อำเภอ</div>
          <select
            name="SubDistrict"
            id="SubDistrict"
            onChange={(e) => handleDistrict(e)}
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          >
            {amphoe &&
              amphoe.map((amp, index) => {
                return (
                  <option key={`amphoe_${index}`} value={amp}>
                    {amp}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex p-1">
          <div className="px-2">เขต/ตำบล</div>
          <select
            name="District"
            id="District"
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          >
            {districts && districtComponent(districts)}
          </select>
        </div>
        {/* <div className="flex p-1">
          <span className="px-2">ที่อยู่อาศัย</span>
          <input
            type="textarea"
            className="rounded-md outline-none border-none"
            style={textAreaStyle}
          />
        </div> */}
      </div>

      {/* Workplace */}
    </div>
  );
};

export default WorkingArea;
