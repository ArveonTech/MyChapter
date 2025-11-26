const AttributesComponent = ({ dataNotes, loading, errorNotes }) => {
  const attributes = [
    { label: "Tag", value: dataNotes?.tag },
    { label: "Status", value: dataNotes?.status },
    { label: "Archive", value: dataNotes?.incArchive === "all" ? "All" : "Archive" },
  ];

  return (
    <div className="fixed bottom-0 flex flex-col sm:flex-row gap-10 justify-center items-center px-10 py-10">
      {attributes.map((item, index) => (
        <div key={index} className="bg-secondary py-2 px-5 rounded-2xl w-full md:w-fit">
          <h1 className="text-[clamp(8px,5vw,14px) sm:text-lg]">
            {item.label} : {item.value}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default AttributesComponent;
