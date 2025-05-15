import {
    BarChart4,
    FileText,
    Shuffle,
  } from "lucide-react";
  
  const features = [
    {
      icon: <BarChart4 size={28} className="text-f2green" />,
      title: "Real-Time Progress Stats",
      description: "Track remaining time, task progress, and completion percentages",
    },
    {
      icon: <FileText size={28} className="text-f2green" />,
      title: "Automated PDF Reports",
      description: "Generate and download clean, structured reports with just one click.",
    },
    {
      icon: <Shuffle size={28} className="text-f2green" />,
      title: "Random Task Selector",
      description: "Simplify prioritization or break the tie with a smart random task picker.",
    },
  ];
  
  const Features = () => {
    return (
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 ">
        <div className="max-w-6xl bg-[#101010]/10 
        shadow-lg shadow-f2green/30
        p-4 rounded-xl border-2 border-f2green/30">
            <h2 className="text-white text-xl md:text-2xl font-light mb-8 text-center">
            <span className="text-f2green font-medium">Modern</span> Kanban Boards potentiated
            </h2>
    
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
            {features.map((feat, index) => (
                <div
                key={index}
                className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0f0f0f] to-f2green/30 border border-f2green/30 rounded-xl p-6 flex-1 hover:shadow-lg hover:shadow-f2green/30 transition-all duration-300"
                >
                <div className="mb-4">{feat.icon}</div>
                <h3 className="text-f2green text-lg font-semibold">{feat.title}</h3>
                <p className="text-sm text-white mt-2">{feat.description}</p>
                </div>
            ))}
            </div>

        </div>
      </section>
    );
  };
  
  export default Features;
  