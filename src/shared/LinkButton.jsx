import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LinkButton = ({
  to,
  buttonText,
  variant = "default",
  size = "md",
  className,
}) => {
  return (
    <Link to={to} className={`inline-block ${className}`}>
      <Button variant={variant} size={size}>
        {buttonText}
      </Button>
    </Link>
  );
};

export default LinkButton;
