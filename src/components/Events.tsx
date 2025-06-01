'use client';

const events = [
  {
    id: 1,
    title: "Tech Summit 2024",
    date: "June 15-17, 2024",
    location: "San Francisco, CA",
    image: "/events/summit.jpg",
    description: "Join us for the biggest tech conference of the year"
  },
  {
    id: 2,
    title: "AI Workshop",
    date: "July 22, 2024",
    location: "New York, NY",
    image: "/events/workshop.jpg",
    description: "Hands-on workshop on AI implementation"
  },
  {
    id: 3,
    title: "Startup Meetup",
    date: "August 5, 2024",
    location: "Austin, TX",
    image: "/events/meetup.jpg",
    description: "Network with fellow entrepreneurs"
  }
];

export default function Events() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div key={event.id} className="bg-gray-900 rounded p-4">
          <div className="h-48 mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
          <p className="text-gray-400 mb-2">{event.date}</p>
          <p className="text-gray-400 mb-4">{event.location}</p>
          <p className="text-gray-300 mb-4">{event.description}</p>
          <button className="w-full bg-white text-black px-4 py-2 rounded">
            Learn More
          </button>
        </div>
      ))}
    </div>
  );
} 