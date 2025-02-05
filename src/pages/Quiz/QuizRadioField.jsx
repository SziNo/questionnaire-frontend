import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const QuizRadioField = ({ question, onValueChange }) => {
  const handleRatingChange = (value) => {
    onValueChange(question._id, value);
  };

  return (
    <div className="px-2 py-4 bg-gray-100 odd:bg-white even:bg-gray-50 shadow-md">
      <Label className="block mb-2 md:mb-4 italic text-lg">
        {question.question}
      </Label>
      <RadioGroup
        defaultValue="3"
        onValueChange={handleRatingChange}
        className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id={`rating-1-${question._id}`} />
          <Label htmlFor={`rating-1-${question._id}`}>Elfogadhatatlan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="2" id={`rating-2-${question._id}`} />
          <Label htmlFor={`rating-2-${question._id}`}>Megfelelőtlen</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3" id={`rating-3-${question._id}`} />
          <Label htmlFor={`rating-3-${question._id}`}>Átlagos</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="4" id={`rating-4-${question._id}`} />
          <Label htmlFor={`rating-4-${question._id}`}>Megfelelő</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="5" id={`rating-5-${question._id}`} />
          <Label htmlFor={`rating-5-${question._id}`}>Remek</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuizRadioField;
