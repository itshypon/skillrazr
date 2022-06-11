import logo from "../assets/images/SkillRazr.svg";
import genlent_upi_code_scanner from '../assets/images/genlent_upi_code_scanner.png';

const BankDetails = (props: any) => {
    const { amount } = props;

    return (
        <div className="p-1">
            <div className='font-bold'>Pay ₹{(amount).toLocaleString()} to purchase this course</div>
            <div className='text-4xl flex justify-center p-4'><img className='w-[240px]' src={logo} alt="logo" /></div>

            <div className='bg-gray-600 text-white p-2 rounded'>
                <div className="flex flex-wrap flex-col md:flex-row  items-center justify-center p-2 w-full">
                    <table>
                        <tr>
                            <td>Name of the account Holder & Address</td>
                            <td className='font-bold'><b>Genlent Technologies (OPC) Pvt. Ltd.</b><br />
                                <span>
                                    Plot No 1073 And 1074 Raja Rajeswara Nagar, Serilingampally,
                                    Hyderabad - 500084
                                </span>
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td>Bank Name & Address</td>
                            <td className='font-bold'><span>HDFC Bank</span> <br />
                                <span>
                                    Jubilee Hills, Hyderabad - 500033
                                </span>
                            </td>

                        </tr>
                        <br />
                        <tr>
                            <td>Current Account Number</td>
                            <td className='font-bold'><b>50200067718239</b></td>
                        </tr>
                        <tr>
                            <td>IFSC Code</td>
                            <td className='font-bold'>HDFC0006464</td>
                        </tr>
                        <br />
                        <tr>
                            <td>Scan QR Code to pay using UPI</td>
                            <td><img className='w-[240px]' src={genlent_upi_code_scanner} alt="upi code"></img></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default BankDetails;