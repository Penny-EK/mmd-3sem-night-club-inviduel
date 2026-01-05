"use client";

import { useState } from "react";
import Tables from "@/app/components/(meleese)/Tables";
import BookingForm from "@/app/components/(penny)/BookingReactForm";

import SubHeader from "@/app/components/(meleese)/SubHeader";
import HeaderNav from "@/app/components/(bjorn)/HeaderNav";

const TABLES = [
  { id: 1, type: 4 },
  { id: 2, type: 4 },
  { id: 3, type: 6 },
  { id: 4, type: 4 },
  { id: 5, type: 8 },
  { id: 6, type: 4 },
  { id: 7, type: 4 },
  { id: 8, type: 6 },
  { id: 9, type: 4 },
  { id: 10, type: 8 },
  { id: 11, type: 4 },
  { id: 12, type: 4 },
  { id: 13, type: 8 },
  { id: 14, type: 4 },
  { id: 15, type: 4 },
];

export default function TablesPage() {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div>
      <HeaderNav />
      <main>
        <SubHeader title="Book Table" />
        <section>
          <Tables
            tables={TABLES}
            selectedTable={selectedTable}
            onSelect={setSelectedTable}
          />
          <BookingForm
            tables={TABLES}
            selectedTable={selectedTable}
            onTableReset={() => setSelectedTable(null)}
          />
        </section>
      </main>
    </div>
  );
}
