const InputComponents = ({ attribut, classname, action }) => {
  return <input {...attribut} className={classname} onChange={action} />;
};

export default InputComponents;
