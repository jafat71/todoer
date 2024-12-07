import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideDelete, LucideEdit2 } from "lucide-react";
import { SortableItem } from "./SortableItem";

const SkeletonItem = () => {
    return (
        <div className="flex-1 h-full w-full overflow-x-auto  opacity-45">
            <Card className="flex flex-col flex-1 min-w-[100px] md:min-w-[170px] xl:min-w-[275px] 
            h-full
            bg-voidBlack">
                <CardHeader>
                    <CardTitle className="text-f2green text-2xl"></CardTitle>
                </CardHeader>
                <CardContent className="flex-1  overflow-y-hidden p-0">
                    <SortableItem>
                        <div className="p-2 w-full my-2 bg-white rounded-md shadow-sm flex flex-col space-y-2">
                            <div className="text-sm break-words"></div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    className="w-8"
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    <LucideDelete width={10} />
                                </Button>
                                <Button
                                    className="w-8"
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    <LucideEdit2 width={10} />
                                </Button>
                            </div>
                        </div>
                    </SortableItem>
                </CardContent>
                <Button className="mt-auto bg-fgreen hover:text-white transition-all duration-300  m-2"></Button>
            </Card>
        </div>
    );
};

const SkeletonColumn = () => {
    return (
        <div className="flex flex-row items-center justify-center opacity-50 flex-1 h-full">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
        </div>
    );
};

export default SkeletonColumn;
