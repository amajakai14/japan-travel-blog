import Link from "next/link";
import Image from "next/image";

function TopPage() {
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="text-lg pb-4  lg:text-2xl flex-grow lg:flex-grow-0 flex justify-center p-4">
          ยินดีต้อนรับเข้าสู่เว็บไซต์
        </div>
        <div className=" p-4 lg:p-0 mx-auto">
          <Image
            src="/../../static/trollface.svg"
            alt="trollface"
            layout="fixed"
            width={window.innerWidth / 4}
            height={window.innerHeight / 4}
          />
        </div>
        <div className="flex flex-col pb-4 ">
          <div className="text-lg lg:text-2xl flex-grow flex justify-center p-4">
            ให้เราทำความรู้จักกับคุณมากขึ้น
            <br />
            คุณคือ ...
          </div>
          <div className="text-lg rounded-full lg:text-xl flex-grow flex justify-center p-4 gap-10">
            <Link href="/employees">
              <a className="border border-black rounded-full px-2 hover:backdrop-brightness-75 hover:text-white">
                ผู้ต้องการหางาน
              </a>
            </Link>
            <Link href="/employers">
              <a className="border border-black rounded-full px-2 hover:backdrop-brightness-75 hover:text-white">
                {" "}
                ผู้ต้องการจ้างงาน
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopPage;
