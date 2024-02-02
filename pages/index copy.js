import {
  BanknotesIcon,
  ChatBubbleBottomCenterIcon,
  DocumentIcon,
  EnvelopeIcon,
  HeartIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon
} from "@heroicons/react/24/solid";
const features = [
{
  name: "Raise challenge",
  description:
    "User can raise challenge against any organic farm through putting some amount of money on stack.",
  icon: ShieldCheckIcon,
},
{
  name: "Create Request",
  description:
    "Farmer can create request for their own farm and allow investors to invest in their farm",
  icon: PlusCircleIcon,
},
{
  name: "Enhance security",
  description:
    "Prohibiting manipulation of data through blockchain to ensure better security and standardized storing of data.",
  icon: ShieldExclamationIcon,
},
{
  name: "Earn through incentives",
  description:
    "User can earn incentives if their challenges get succesfull and organic farmer found guilty.",
  icon: BanknotesIcon,
},
{
  name: "Team Reporting",
  description:
    "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
  icon: DocumentIcon,
},
{
  name: "Saved Replies",
  description:
    "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
  icon: ChatBubbleBottomCenterIcon,
},
{
  name: "Email Commenting",
  description:
    "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
  icon: EnvelopeIcon,
},
{
  name: "Connect with Customers",
  description:
    "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
  icon: HeartIcon,
},
];

const metrics = [
{
  id: 1,
  stat: "8K+",
  emphasis: "Companies",
  rest: "use laoreet amet lacus nibh integer quis.",
},
{
  id: 2,
  stat: "25K+",
  emphasis: "Countries around the globe",
  rest: "lacus nibh integer quis.",
},
{
  id: 3,
  stat: "98%",
  emphasis: "Customer satisfaction",
  rest: "laoreet amet lacus nibh integer quis.",
},
{
  id: 4,
  stat: "12M+",
  emphasis: "Issues resolved",
  rest: "lacus nibh integer quis.",
},
];
const Home = () => {
return (
  <div className="bg-white">
    <main>
      {/* Hero section */}
      <div className="relative pt-10">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-r from-gray-500 to-gray-700" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-300 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Take control of your farm</span>
                <span className="block text-indigo-200">
                Cultivate a Greener Tomorrow
                </span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
              Your Guranteed Gateway to Supporting Local Farms,Reaping the Rewards.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <a
                    href="/login"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                  >
                    Get started
                  </a>
                  <a
                    href="/farms"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                  >
                    View farms
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Feature Section */}
      <div className="bg-gradient-to-r from-gray-500 to-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Explore features in Community-Supported Organic Farming.
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-purple-200">
              Invest with Confidence, Harvest with Certainty: Our Guarantee Ensures Purely Organic Farms.
              Bridging Investors to Organic Farms, Backed by Our Unwavering Guarantee.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name}>
                <div>
                  <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-purple-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);
};

export default Home;
