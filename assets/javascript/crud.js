const SUPABASE_URL = 'https://aktjuchcpkemgoadouex.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzQ0MDA4NCwiZXhwIjoxOTM5MDE2MDg0fQ.TgwyA6VRzuYfC5R02noy18BLcshnySbmdbc1Sfe5WNU'

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const index = () => {
    return supabaseClient.from('players')
        .select('*')
        .then(results => { return results.data; });
}

const indexWinners = () => {
    return supabaseClient.from('players')
        .select('*')
        .range(0, 9)
        .order('score', { ascending: true })
        .then(results => { return results.data; });
}

const indexAllWinners = () => {
    return supabaseClient.from('players')
        .select('*')
        .order('score', { ascending: true })
        .then(results => { return results.data; });
}

const show = async (id) => {
    return await supabaseClient.from('players')
        .select('*')
        .eq('id', id)
        .then(results => { return results.data[0]; });
}

const create = (player) => {
    return supabaseClient.from('players')
        .insert(player)
        .then(results => { return results.data[0]; });
}

const destroy = (id) => {
    return supabaseClient.from('players')
        .delete()
        .eq('id', id)
        .then(results => { return results.data[0]; });
}

const update = (id, changes) => {
    return supabaseClient.from('players')
        .update(changes)
        .eq('id', id)
        .then(results => { return results.data[0]; });
}

