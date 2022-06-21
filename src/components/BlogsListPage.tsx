
import { NavLink } from "react-router-dom";
import blogs from '../data/blogs';

export default function BlogsList(props: any) {
    return (
        <div
            id="courses"
            className={
                "my-24 px-6 py-20 flex flex-col items-center flex-wrap justify-center"
            }
        >
            <div className="text-6xl text-center mb-12">Blogs</div>

            <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
                {blogs.map((blog: any) => {
                    return (
                        <NavLink to={`/blogs/${blog.id}`} onClick={() => {
                            window.scrollTo(0, 0);
                        }}>
                            <div
                                key={blog.title}
                                className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-4 mt-lg-0 box-shadow border border-green-500 rounded-[5px]"
                            >
                                <div className="ml-2 text-2xl">{blog.title} </div>
                                <div className="ml-2">{blog.description}</div>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
            <div className='p-2'>blogs on other topics coming soon...</div>
        </div>
    );
}
