import DataFetcher from "@/app/components/(bjorn)/DataFetcher";
import TestimonialsContent from "./TestimonialsContent";

export default function TestimonialsSection() {
  return (
    <DataFetcher endpoint="testimonials">
      {(data) => <TestimonialsContent data={data} />}
    </DataFetcher>
  );
}
