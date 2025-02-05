import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CardComponent = ({
  title,
  path,
  type,
  imageUrl,
  buttonText,
  id,
  optionalFunc,
  optionalButtonText,
}) => {
  return (
    <Card className="flex flex-col p-2">
      <div className="w-full h-48 lg:h-60 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <CardHeader>
        <CardTitle className="md:text-lg capitalize">{`${title} kérdőív`}</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col justify-between items-center">
        <Link to={`${path}/${type}`} className="w-full">
          <Button variant="default" className="w-full">
            {buttonText}
          </Button>
        </Link>
        {optionalFunc && (
          <Button
            variant="grogu"
            className="w-full mt-2"
            onClick={() => optionalFunc({ _id: id, title, type })}
          >
            {optionalButtonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
