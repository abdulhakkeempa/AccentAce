export default function Title({title, subtitle}){
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-lg">{subtitle}</p>}
    </div>
  );
}