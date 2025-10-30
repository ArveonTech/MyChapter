const InputComponents = ({ attribut, classname, action }) => {
  return <input type={attribut.type} name={attribut.name} value={attribut?.value} autoComplete={attribut?.autoComplete} placeholder={attribut.placeholder} className={classname} onChange={action} />;
};

export default InputComponents;
