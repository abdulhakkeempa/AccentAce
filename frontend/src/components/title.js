export default function Title({title, subtitle}){
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="md:text-4xl text-xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="md:text-lg text-base">{subtitle}</p>}
    </div>
  );
}