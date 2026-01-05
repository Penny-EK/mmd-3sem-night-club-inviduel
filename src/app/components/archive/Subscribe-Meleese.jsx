const Subscribe = () => {
    return ( <div className="w-full bg-black pt-16  flex flex-col items-center justify-center
 text-white col-start-1 col-end-4">
        <h1 className="uppercase tracking-widest">want the latest night club news</h1>
        <h2 className="-tracking-wider">Subscribe to our newsletter and never miss an <span className="text-accent">Event</span></h2>
        <form className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            <input 
            className="border-b-2 border-white"
            type="email"
            placeholder="Enter Your Email"/>  
            <button className="uppercase px-10 py-3 text-sm font-semibold tracking-wide border-t-2 border-b-2 hover:bg-pink-600 hover:text-black transition"
           type="submit">Subscribe</button>
        </form>
    </div> );
}
 
export default Subscribe;