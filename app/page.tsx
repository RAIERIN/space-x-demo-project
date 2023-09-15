"use client";

import apiCalls from "@/graphql";
import { ShipsQuery } from "@/util/types/graphql";
import { useQuery } from "@apollo/client";
import Image from "next/image";

export default function Home() {
  const { data } = useQuery<ShipsQuery>(apiCalls.queries.ships, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <main className="flex justify-center min-h-screen p-14">
      <div className="w-full max-w-7xl justify-between grid grid-cols-4 gap-4">
        {data?.ships?.map((ship, index) => {
          return (
            <div
              key={index}
              className="col-span-1 border border-solid border-white p-2 flex justify-center items-center flex-col rounded"
            >
              <figure className="w-28 h-28 rounded-md relative overflow-hidden">
                {ship?.image ? (
                  <Image
                    src={ship.image!}
                    height={120}
                    width={120}
                    alt={`image-${ship.name}`}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src={
                      "https://www.americandrivingacademy.com/wp-content/uploads/2019/12/placeholder.png"
                    }
                    alt="placeholder image"
                    height={120}
                    width={120}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                )}
              </figure>
              <div className="mt-2">{ship?.name}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
