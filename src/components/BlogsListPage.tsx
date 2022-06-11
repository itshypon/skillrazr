
import { NavLink } from "react-router-dom";

export default function BlogsList(props: any) {
    const blogs: any = [
        {
            id: "Job_roles_in_tech_company",
            title: "Job roles in a Tech company"
        }
    ];

    return (
        <div
            id="courses"
            className={
                "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-center"
            }
        >
            <div className="text-6xl text-center mb-4">Blogs</div>

            <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
                {blogs.map((blog: any) => {
                    return (
                        <NavLink to={`/blogs/${blog.id}`} onClick={() => {
                            window.scrollTo(0, 0);
                        }}>
                            <div
                                key={blog.title}
                                className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-4 mt-lg-0 font-bold box-shadow border border-green-500 rounded-[5px]"
                            >


                                <div className="ml-2 text-2xl">{blog.title} </div>
                                <div className="ml-2">{blog.description}</div>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
            <div className='p-2'>bloges on other topics coming soon...</div>
        </div>
    );
}
