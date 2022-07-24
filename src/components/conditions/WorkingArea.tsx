import { ChangeEvent, useState } from "react";
import locationData from "../../data/location";
import { province_th } from "../../data/province";

function WorkingArea() {
  const [provinces, setProvinces] = useState<string[]>(province_th);
  const [districts, setDistricts] = useState<string[]>([]);
  const [subDistricts, setSubDistricts] = useState<string[]>([]);
  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/(?:^|\D)(\d{5})(?!\d)/g)) {
      // search for location detail
      searchLocation(parseInt(e.target.value));
    } else {
      //do not thing
      setProvinces(province_th);
      setDistricts([]);
      console.log("notmatch");
    }
  };

  const searchLocation = (ZipCode: number) => {
    const areaFound = locationData.filter((elem) => elem.zipcode === ZipCode);
    console.log(areaFound);
    if (areaFound.length !== 0) {
      setProvinces([areaFound[0]!.province]);
      areaFound.map((area) => {
        console.log(districts);
        setDistricts((arr) => [...arr, area.district]);
      });
    } else {
      setProvinces(province_th);
      setDistricts([]);
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

  const subDistrictComponent = (subDistricts: string[]) => {
    if (subDistricts.length === 0) return <option></option>;
    const distinctDistrict = subDistricts.filter(
      (subDistrict, index) => subDistricts.indexOf(subDistrict) === index
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

  return (
    <div>
      {/* condition */}
      <div>
        <div>ประเทศไทย</div>
        <div>
          <div>เลขที่ไปรษณีย์</div>
          <input
            onChange={(e) => handleZipCode(e)}
            name="ZipCode"
            id="ZipCode"
            type="number"
          />
        </div>
        <div>
          <div>จังหวัด</div>
          <select name="Province" id="Province">
            {provinces.map((province, index) => {
              return (
                <option key={index} value={province}>
                  {province}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div>เขต/ตำบล</div>
          <select name="District" id="District">
            {districts && districtComponent(districts)}
          </select>
        </div>
        <div>
          <div>แขวง/อำเภอ</div>
          <select name="SubDistrict" id="SubDistrict"></select>
        </div>
        <input type="textarea" />
      </div>

      {/* Workplace */}
    </div>
  );
}

export default WorkingArea;
