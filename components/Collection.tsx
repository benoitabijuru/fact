import { IProject } from "@/lib/database/models/project.model";
import Card from "./Card";

type CollectionProps = {
  data: IProject[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType?: 'My_Tickets' | 'All_Projects';
  totalPages?:number;
  currentPage?:number;
  hasNext?:boolean;
  hasPrev?:boolean;
  totalCount?:number;
}

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  // totalPages = 0,
  // currentPage = 1,
  // hasNext = false,
  // hasPrev = false,
  // totalCount = 0
}: CollectionProps) => {
 

  
 

  
  return (
    <>
      {data.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="">
            <ul className="grid grid-cols-1 gap-8 mx-2       /* default: tiny margin on extra-small devices */
    sm:mx-6    /* slightly bigger margin on small devices */
    md:mx-12   /* medium devices */
    lg:mx-24   /* large devices */
    xl:mx-40   /* extra large screens */">
              {data.map((project, index) => {
                return (
                  <li key={project.slug} className="">
                    <Card project={project} index={index} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;