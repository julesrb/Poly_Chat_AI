import "dotenv/config";
import pool from "../src/lib/db.js"; // Adjust path if needed

async function seed() {
  try {
    // 1️⃣ Insert user Andy
    const userRes = await pool.query(
      `INSERT INTO users (name)
       VALUES ($1)
       RETURNING id;`,
      ["Andy"]
    );
    const userId = userRes.rows[0].id;
    console.log("✅ Inserted user:", userId);

    // 2️⃣ Insert categories
    const categories = ["coding", "cooking"];
    const categoryIds: Record<string, number> = {};
    for (const category of categories) {
      const res = await pool.query(
        `INSERT INTO categories (user_id, name)
         VALUES ($1, $2)
         RETURNING id;`,
        [userId, category]
      );
      categoryIds[category] = res.rows[0].id;
    }
    console.log("✅ Inserted categories:", categoryIds);

    // 3️⃣ Insert threads & messages

    // coding → c++
    const cppConvo = await pool.query(
      `INSERT INTO threads (user_id, category_id, title)
       VALUES ($1, $2, $3)
       RETURNING id;`,
      [userId, categoryIds["coding"], "c++"]
    );
    const cppId = cppConvo.rows[0].id;

    await pool.query(
      `INSERT INTO messages (thread_id, role, content)
       VALUES
         ($1, 'user', 'what is the latest c++ release?'),
         ($1, 'ai', 'The latest release is C++23, finalized in December 2023.'),
         ($1, 'user', 'what is the main difference with the last one ?'),
         ($1, 'ai', 'C++23 focuses on usability: added ranges improvements, pattern matching, and constexpr enhancements.');`,
      [cppId]
    );

    // coding → delete cascade in SQL
    const cascadeConvo = await pool.query(
      `INSERT INTO threads (user_id, category_id, title)
       VALUES ($1, $2, $3)
       RETURNING id;`,
      [userId, categoryIds["coding"], "delete cascade in sql"]
    );
    const cascadeId = cascadeConvo.rows[0].id;

    await pool.query(
      `INSERT INTO messages (thread_id, role, content)
       VALUES
         ($1, 'user', 'how works delete on cascade in SQL ?'),
         ($1, 'ai', 'When you delete a parent row, all related child rows in foreign key tables are automatically deleted.'),
         ($1, 'user', 'what should one pay attention to when using it ?'),
         ($1, 'ai', 'Be careful: it can remove large amounts of data unexpectedly if relationships are deep or unfiltered.');`,
      [cascadeId]
    );

    // cooking → egg foam
    const foamConvo = await pool.query(
      `INSERT INTO threads (user_id, category_id, title)
       VALUES ($1, $2, $3)
       RETURNING id;`,
      [userId, categoryIds["cooking"], "egg foam"]
    );
    const foamId = foamConvo.rows[0].id;

    await pool.query(
      `INSERT INTO messages (thread_id, role, content)
       VALUES
         ($1, 'user', 'how does one make the best egg foam?'),
         ($1, 'ai', 'Use fresh egg whites, beat them at room temperature, and add a pinch of acid like lemon juice.'),
         ($1, 'user', 'what is the trickiest part ?'),
         ($1, 'ai', 'Avoid overbeating; foam peaks should be glossy and soft, not dry or grainy.');`,
      [foamId]
    );

    // cooking → outdated egg
    const eggConvo = await pool.query(
      `INSERT INTO threads (user_id, category_id, title)
       VALUES ($1, $2, $3)
       RETURNING id;`,
      [userId, categoryIds["cooking"], "outdated egg"]
    );
    const eggId = eggConvo.rows[0].id;

    await pool.query(
      `INSERT INTO messages (thread_id, role, content)
       VALUES
         ($1, 'user', 'how do i know if my egg is still good?'),
         ($1, 'ai', 'Place it in water: fresh eggs sink; bad eggs float due to increased air inside.');`,
      [eggId]
    );

    console.log("🎉 Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await pool.end();
  }
}

seed();