import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, icon, title, subtitle }) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover: shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="flex flex-col flex-1 ml-5">
            <h1 className="text-white text-lg mt-2 ">{title}</h1>
            <p className="text-white text-sm md:w-8/12 mt-1">{subtitle}</p>
        </div>
    </div>
)

const Services = () => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl text-gradient">
                        Services that we <br /> continue to improve
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center py-0">
                <ServiceCard
                    color="bg-[#2952e3]"
                    title="Security Guaranteed."
                    icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
                    subtitle="Security is guaranteed. Loyalty Over Royalty."
                />
                <ServiceCard
                    color="bg-[#800080]"
                    title="Best Exchange Rates."
                    icon={<BiSearchAlt fontSize={21} className="text-white" />}
                    subtitle="Security is guaranteed. Loyalty Over Royalty."
                />
                <ServiceCard
                    color="bg-[#f84550]"
                    title="Fastest transactions."
                    icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                    subtitle="Security is guaranteed. Loyalty Over Royalty."
                />
            </div>
        </div>
    )
}

export default Services;
