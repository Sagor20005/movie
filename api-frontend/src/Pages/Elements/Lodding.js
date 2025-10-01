export default function Lodding({size}){
  switch(size){
    case "extra-small":
      return <div className="h-[20px] w-[20px] border-t-[2px] border-black rounded-full m-auto animate-spin"></div>
    case "small":
      return <div className="h-[30px] w-[30px] border-t-[1px] border-black rounded-full m-auto animate-spin"></div>
    case "mid":
      return <div className="h-[50px] w-[50px] border-t-[2px] border-black rounded-full m-auto animate-spin"></div>
    case "big":
      return <div className="h-[70px] w-[70px] border-t-[2px] border-black rounded-full m-auto animate-spin"></div>
  }
}