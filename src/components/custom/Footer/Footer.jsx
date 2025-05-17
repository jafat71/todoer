import { Github } from "lucide-react";

const Footer = () => {

  return (
    <footer className="w-full z-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="">
            <h3 className="text-2xl font-bold text-f2green">KNBNN</h3>
            <p className="text-neutral-400 text-sm">
                An awesome tool for tracking tasks on your projects. The Kanban Board you know but better. 
            </p>
          </div>


          <div className="flex justify-end">
            <div className="flex space-x-4">
              <a
                href="https://github.com/jafat71/todoerbk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-f2green transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
             
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800">
          <p className="text-center text-neutral-400 text-sm">
            © {new Date().getFullYear()} KNBNN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
