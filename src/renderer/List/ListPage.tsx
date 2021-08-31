import React from "react";
import { dummyResponse } from "./dummy";

export const ListPage = () => {
  return (
    <div>
      {dummyResponse.map((item) => (
        <div key={item.EA_ISBN} className="border-none border-green-300 rounded-md m-3 p-3 bg-green-500 hover:bg-green-600 text-green-50">
          <div className="pb-2">
            <span>{item.TITLE}</span>
          </div>
          <div>
            <span>{item.AUTHOR}</span>
          </div>
          <div>
            <span>{item.PUBLISHER}</span>
            <span>{item.PAGE ? parseInt(item.PAGE) : ""}</span>
            {item.PAGE && (
              <div>
                <progress className="h-3" value="300" max={parseInt(item.PAGE)}></progress>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
