-- Run this in the Neon SQL editor (or psql) AFTER running `prisma migrate dev`,
-- as an alternative to `npm run seed`.

INSERT INTO dashboards (name, "createdAt")
VALUES ('Sample Marketing Dashboard', now())
RETURNING id;

-- Replace :dashboard_id below with the id returned above before running the inserts.

INSERT INTO widgets (dashboardId, type, x, y, width, height, content, "createdAt")
VALUES
  (:dashboard_id, 'text', 40, 40, 320, 140,
   '{"html": "<p><strong>Welcome!</strong> This is a sample text widget.</p>", "fontSize": 16}', now()),

  (:dashboard_id, 'image', 400, 40, 300, 200,
   '{"url": "https://placehold.co/300x200?text=Sample+Image"}', now()),

  (:dashboard_id, 'chart', 40, 220, 420, 280,
   '{"title": "Monthly Sales", "labels": ["Jan","Feb","Mar","Apr","May"], "data": [12,19,8,15,22]}', now());
