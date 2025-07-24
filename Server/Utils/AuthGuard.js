const userRepo = require('../Repositories/UserRepository');

function requireOwnership(req, res, next) {
  const userIdFromToken = String(req.user?.id);
  const idParam = String(req.params.id);

  if (userIdFromToken !== idParam && req.user?.role !== 'admin') {
    console.log('[Ownership check failed]', userIdFromToken, idParam);
    return res.status(403).json({ error: 'Forbidden: You can only modify your own account' });
  }

  next();
}


async function attachUserFromAuth(req, res, next) {
  try {
    const auth0Id = req.auth?.sub;
    if (!auth0Id) return res.status(401).json({ error: 'Missing auth0Id in token' });

    const user = await userRepo.getUserByAuth0Id(auth0Id);
    if (!user) return res.status(401).json({ error: 'User not found in database' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  requireOwnership,
  attachUserFromAuth
};