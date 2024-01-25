import Button from "./Button";
import Icon from "./Icon";

export default function Pages() {
  return (
    <div className="flex items-center gap-1 bg-[#1f1e21]">
      <Button>
        <Icon className="bg-blue-400 rounded-full"></Icon>
      </Button>
      <Button>
        <Icon className="bg-blue-400 rounded-full"></Icon>
      </Button>
      <Button>
        <Icon className="bg-blue-400 rounded-full"></Icon>
      </Button>
      <Button>
        <Icon className="bg-blue-400 rounded-full"></Icon>
      </Button>
      <Button>
        <Icon className="bg-blue-400 rounded-full"></Icon>
      </Button>
    </div>
  );
}
