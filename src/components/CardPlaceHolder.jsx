import { Placeholder } from "rsuite";

export const CardPlaceHolder = () => {
  return (
    <>
      <div className="mx-2 w-80 lg:mb-0 border rounded-lg shadow-sm hover:shadow-xl mt-7 mb-8">
        <div className="">
          <Placeholder.Paragraph
            className="w-full h-44 mt-5 "
            graph="image"
            rows={8}
            active
          />
        </div>
        <div className="bg-white">
          <div className="p-4">
            <div className="flex justify-between">
              <Placeholder.Paragraph
                rows={2}
                active
                className="text-lg font-semibold"
              ></Placeholder.Paragraph>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
