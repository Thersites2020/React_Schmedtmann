export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Time to start adding items to your packing list!</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percent === 100 ? 'Everything is packed! Ready to go! ✈' :
          `🧳 You have ${numItems} item${numItems !== 1 ? 's' : ''} on your list, and you've already packed ${numPacked} (${percent}%).`}
      </em>

    </footer>
  );
}
