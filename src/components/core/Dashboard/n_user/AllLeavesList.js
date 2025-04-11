import { Link } from 'react-router-dom'

const statuses = {
    approved: 'text-green-600 bg-green-200 ring-green-600/20',
    rejected: 'text-gray-600 bg-red-300 ring-gray-500/10',
    pending: 'text-yellow-800 bg-yellow-200 ring-yellow-600/20',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function AllLeavesList({allLeaves}) {
  return (
    <ul role="list" className="divide-y divide-gray-300">
      {allLeaves.map((leave,index) => (
        <li key={index} className="flex items-center justify-between  py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
            <p className="text-sm font-semibold leading-6 text-gray-900">{leave?.l_nature}</p>
              <p
                className={classNames(
                  statuses[leave?.status],
                  'mt-0.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {leave?.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              {<p className="whitespace-nowrap">
                Applied on : <time>{leave?.submission_date}</time>
              </p>}
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">Total Days : {leave?.no_of_days}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
          <Link to={`/dashboard/student/all-leave-list/get-user-leave-details/${leave?.application_id}`}>
          <div
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View Application<span className="sr-only">, {leave?.name}</span>
            </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}