import { motion } from "motion/react"

export default function Tables({ tables, selectedTable, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-10 justify-items-center md:grid-cols-5">
        {/* map all the tables from the page.js */}
      {tables.map((table) => {
        const imgSrc = `/table/table_${table.type}.png`;

        return (
            // using Framer Motion to animate the hover animation
          <motion.button
            key={table.id}
            type="button"
            // on click, call onSelect with the table id in
            onClick={() => onSelect(table.id)}
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <img
            // show the correct table image based on type in page.js
              src={imgSrc}
              alt={`Table ${table.id}`}
              className={`transition ${
                // if the table is selected (if it has an id), set opacity to 100, else 80
                selectedTable === table.id ? "opacity-100" : "opacity-80"
            }`}
            
            />

            <span
            // and the table number changes to accent color if selected (if it has an id) otherwise just white
              className={`absolute inset-0 flex items-center justify-center font-bold text-sm ${
                selectedTable === table.id ? "text-accent" : "text-white"
              }`}
            >
              {table.id}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
