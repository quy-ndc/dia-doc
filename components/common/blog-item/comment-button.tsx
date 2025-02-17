import { Text } from '~/components/ui/text'
import { Button } from "../../ui/button";
import { MessageSquareText } from '~/lib/icons/MessageSquareText';


export default function CommentButton() {

    return (
        <Button
            variant={"ghost"}
            className="flex-row gap-3 items-center"
        >
            <MessageSquareText className={`text-foreground`} size={17} />
            <Text className={`text-base font-bold`}>20</Text>
        </Button>
    );
}