import { Button } from "@mui/material";

const WorkCard = ({ category, date, title, description }) => {
  return (
    <>
      <div className="h-full w-[280px] min-w-[280px] bg-blue-500 rounded-md px-3 py-3">
        <div className="flex justify-between items-center">
          <span className="p-1.5 bg-red-500 rounded-md">{category}</span>
          <span>{date}</span>
        </div>
        <h3 className="text-xl mt-6">{title}</h3>
        <p className="mt-2">{description}</p>
        <Button
          variant="outlined"
          size="small"
          color="inherit"
          style={{ marginTop: "10px" }}
        >
          Accepted
        </Button>
      </div>
    </>
  );
};

export default WorkCard;
