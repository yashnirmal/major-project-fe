const user = {
    name: "Debbie Lewis",
    handle: "deblewis",
    email: "debbielewis@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
  };
export default function UpdatePassword() {
    return (
        <form
              className="divide-y divide-gray-200 lg:col-span-9"
              action="#"
              method="POST"
            >
            <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Password
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful
                        what you share.
                    </p>
                    <div className="mt-3 mb-3 col-span-12 sm:col-span-6">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            defaultValue={user.name.split(' ')[0]}
                        />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            defaultValue={user.name.split(' ')[1]}
                        />
                        </div>
                    </div>
            </div>
            <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                <button
                  type="button"
                  className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-5 bg-indigo-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Save
                </button>
              </div>
        </form>
    )
}