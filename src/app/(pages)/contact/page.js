import SubHeader from "@/app/components/(meleese)/SubHeader";
import HeaderNav from "@/app/components/(bjorn)/HeaderNav";
import ContactReactForm from "@/app/components/(penny)/ContactReactForm";

export default function Contact() {
  return (
    <div>
      <HeaderNav />
      <main>
        <SubHeader title="Contact Us" />
        <div className="col-start-2">
          <ContactReactForm />
        </div>
      </main>
    </div>
  );
}
